export const getUrl = (url: string) => {
	return url.split("@").shift();
}

export const getFileType = (url: string) => {
	return url.split("@").pop();
}