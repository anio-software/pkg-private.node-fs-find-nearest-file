import {loadImplementation} from "#~src/loadImplementation.ts"

const implementation = loadImplementation()

export async function nodeFsFindNearestFile(
	configFileName: string, dirPath: string
): Promise<string|false> {
	if (!implementation) {
		throw new Error(`This function is not available in a non node context.`)
	}

	return implementation(configFileName, dirPath)
}
