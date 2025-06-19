
const MediaCardContent = ({ section }: { section: any }) => {
    return (
        <div className="space-y-3">
            <div className="space-y-2">
                {section.brochureLink && (
                    <a href={section.brochureLink} className="block text-sm text-blue-600 hover:underline">
                        📄 School Brochure
                    </a>
                )}
                {section.galleryLink && (
                    <a href={section.galleryLink} className="block text-sm text-blue-600 hover:underline">
                        🖼️ Photo Gallery
                    </a>
                )}
                {section.videoTourLink && (
                    <a href={section.videoTourLink} className="block text-sm text-blue-600 hover:underline">
                        🎥 Virtual Tour
                    </a>
                )}
            </div>
        </div>
    )
}

export default MediaCardContent