# Assets Folder

Place your background video file here.

## Video Setup Instructions:

1. Add your video file to this folder (e.g., `background-video.mp4`)
2. Update `src/App.jsx`:
   - Uncomment the import statement: `import backgroundVideo from './assets/your-video-name.mp4'`
   - Update the video source in the `<video>` tag to use: `src={backgroundVideo}`

## Supported Video Formats:
- MP4 (recommended)
- WebM
- OGG

## Video Recommendations:
- Keep file size reasonable for web (under 10MB if possible)
- Use MP4 format with H.264 codec for best browser compatibility
- Consider compressing the video for faster loading

