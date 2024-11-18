export function getPrivateUrl(publicUploadthingUrl: string) {
    const imageUrlSplit = publicUploadthingUrl.split('/f/')
    imageUrlSplit.splice(1, 0, `a/${process.env.UPLOADTHING_APP_ID}`)
    return imageUrlSplit.join('/')
}
