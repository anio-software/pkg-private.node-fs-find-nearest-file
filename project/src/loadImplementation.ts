import {
	nodeFsFindNearestFileSyncFactory
} from "@anio-software/pkg-private.node-fs-find-nearest-file-factory"

export type Implementation = ReturnType<typeof nodeFsFindNearestFileSyncFactory>

const nodeJSRequire: NodeJS.Require|false = await (async () => {
	try {
		const {default: mod} = await import("node:module")

		return mod.createRequire("/")
	} catch {
		return false
	}
})()

export function loadImplementation(): Implementation|false {
	if (!nodeJSRequire) return false

	return nodeFsFindNearestFileSyncFactory(nodeJSRequire)
}
