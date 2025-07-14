import {
	nodeFsFindNearestFileSyncFactory
} from "@anio-software/pkg-private.node-fs-find-nearest-file-factory"

export type Implementation = ReturnType<typeof nodeFsFindNearestFileSyncFactory>

const nodeRequireSymbol = Symbol.for("@anio-software/enkore/global/nodeRequire")

export function loadImplementation(): Implementation|false {
	if (!(nodeRequireSymbol in globalThis)) {
		return false
	}

	const nodeJSRequire = (globalThis as any)[nodeRequireSymbol]

	return nodeFsFindNearestFileSyncFactory(nodeJSRequire)
}
