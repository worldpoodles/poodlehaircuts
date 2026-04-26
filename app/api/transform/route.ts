import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
})

export async function POST(req: NextRequest) {
  try {
    // Check API token
    if (!process.env.REPLICATE_API_TOKEN) {
      return NextResponse.json(
        { error: 'Replicate API token not configured. Add REPLICATE_API_TOKEN to your .env.local file.' },
        { status: 500 }
      )
    }

    const formData = await req.formData()
    const imageFile = formData.get('image') as File
    const cutSlug = formData.get('cut') as string
    const cutPrompt = formData.get('prompt') as string

    if (!imageFile || !cutSlug || !cutPrompt) {
      return NextResponse.json({ error: 'Missing required fields: image, cut, prompt' }, { status: 400 })
    }

    // Validate file type
    if (!imageFile.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image (JPG, PNG, or WEBP)' }, { status: 400 })
    }

    // Validate file size (max 10MB)
    if (imageFile.size > 10 * 1024 * 1024) {
      return NextResponse.json({ error: 'Image must be under 10MB' }, { status: 400 })
    }

    // Convert to base64 data URL for Replicate
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString('base64')
    const mimeType = imageFile.type
    const imageDataUrl = `data:${mimeType};base64,${base64}`

    // Run FLUX Kontext Pro on Replicate
    // This model excels at image editing while preserving subject identity
    const output = await replicate.run(
      'black-forest-labs/flux-kontext-pro',
      {
        input: {
          prompt: cutPrompt,
          input_image: imageDataUrl,
          // These settings optimize for pet grooming transformations:
          guidance: 3.5,        // Higher = follows prompt more strictly
          steps: 28,            // Balance quality vs speed
          output_format: 'webp',
          output_quality: 90,
          safety_tolerance: 2,
        },
      }
    )

    // Replicate returns a URL or stream
    let imageUrl: string

    if (typeof output === 'string') {
      imageUrl = output
    } else if (output instanceof ReadableStream) {
      // Convert stream to blob URL
      const response = new Response(output)
      const blob = await response.blob()
      // For production, upload to storage (S3, Cloudinary, etc.)
      // For now, convert to base64 to return directly
      const arrayBuf = await blob.arrayBuffer()
      const outBase64 = Buffer.from(arrayBuf).toString('base64')
      imageUrl = `data:image/webp;base64,${outBase64}`
    } else if (Array.isArray(output) && output.length > 0) {
      imageUrl = output[0] as string
    } else {
      throw new Error('Unexpected output format from Replicate')
    }

    return NextResponse.json({
      success: true,
      imageUrl,
      cut: cutSlug,
    })

  } catch (error: unknown) {
    console.error('Transform API error:', error)

    const message = error instanceof Error ? error.message : 'Unknown error'

    // Handle specific Replicate errors
    if (message.includes('401') || message.includes('authentication')) {
      return NextResponse.json(
        { error: 'Invalid Replicate API token. Check your REPLICATE_API_TOKEN in .env.local' },
        { status: 401 }
      )
    }

    if (message.includes('credits') || message.includes('billing')) {
      return NextResponse.json(
        { error: 'Insufficient Replicate credits. Add credits at replicate.com/account/billing' },
        { status: 402 }
      )
    }

    return NextResponse.json(
      { error: `Generation failed: ${message}` },
      { status: 500 }
    )
  }
}
