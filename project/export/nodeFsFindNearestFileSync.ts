import {loadImplementation} from "#~src/loadImplementation.ts"

const implementation = loadImplementation()

export function nodeFsFindNearestFileSync(
	configFileName: string, dirPath: string
): string|false {
	if (!implementation) {
		throw new Error(`This function is not available in a non node context.`)
	}

	return implementation(configFileName, dirPath)
}
