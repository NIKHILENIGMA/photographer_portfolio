export function getFullPath(url: string): string {
    const pathStartIndex = url.indexOf('/upload/') + '/upload/'.length
    const pathWithExt = url.slice(pathStartIndex) // 'v1746385227/avatars/zs01qw9blmthlgvnfw5k.png'

    const parts = pathWithExt.split('/')
    parts.shift() // remove version like 'v1746385227'

    const fullPath = parts.join('/').split('.')[0] // 'avatars/zs01qw9blmthlgvnfw5k'
    return fullPath
}
