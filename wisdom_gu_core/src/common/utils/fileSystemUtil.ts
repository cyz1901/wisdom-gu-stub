export function getFileTypeByPath(path: string): string {
    const fileTypes = [
        { type: 'image', ext: ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'] },
        { type: 'video', ext: ['mp4', 'avi', 'wmv', 'rmvb', 'rm', 'mkv', 'flv', '3gp'] },
        { type: 'audio', ext: ['mp3', 'wav', 'wma', 'ogg', 'ape', 'flac'] },
        { type: 'code', ext: ['js', 'ts', 'html', 'css', 'scss', 'less', 'json', 'xml', 'md', 'vue', 'py', 'go', 'java', 'c', 'cpp', 'cs', 'php', 'rb', 'sql'] },
        { type: 'text', ext: ['txt', 'log'] },
        { type: 'zip', ext: ['zip', 'rar', '7z', 'gz', 'tar', 'iso'] },
        { type: 'word', ext: ['doc', 'docx'] },
        { type: 'excel', ext: ['xls', 'xlsx'] },
        { type: 'ppt', ext: ['ppt', 'pptx'] },
        { type: 'pdf', ext: ['pdf'] },
        { type: 'markdown', ext: ['md'] },
    ];
    const ext = path.split('.').pop();
    const fileType = fileTypes.find((fileType) => fileType.ext.includes(ext || ''));
    return fileType ? fileType.type : 'unknown';
}