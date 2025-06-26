import {
	nodeFsFindNearestFileSyncFactory
} from "@anio-software/pkg-private.node-fs-find-nearest-file-factory"

const implementation = await nodeFsFindNearestFileSyncFactory()

export function nodeFsFindNearestFileSync(
	configFileName: string, dirPath: string
): string|false {
	return implementation(configFileName, dirPath)
}
