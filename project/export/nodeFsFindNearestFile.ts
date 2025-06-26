import {
	nodeFsFindNearestFileSyncFactory
} from "@anio-software/pkg-private.node-fs-find-nearest-file-factory"

const implementation = await nodeFsFindNearestFileSyncFactory()

export async function nodeFsFindNearestFile(
	configFileName: string, dirPath: string
): Promise<string|false> {
	return await implementation(configFileName, dirPath)
}
