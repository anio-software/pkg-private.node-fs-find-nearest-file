import {isNode} from "@aniojs/is-node"

function nodeFindNearestFile(
	dependencies: any,
	config_file_name: string,
	dir_path: string
) : string|false {
	const {fs, path} = dependencies
	const absolute_dir_path = fs.realpathSync(dir_path)
	const parent_dir_path = path.dirname(absolute_dir_path)

	let config_path = null

	const entries = fs.readdirSync(absolute_dir_path)

	for (const entry of entries) {
		const absolute_entry_path = path.resolve(absolute_dir_path, entry)
		const stat = fs.lstatSync(absolute_entry_path)

		// ignore directories
		if (stat.isDirectory() || stat.isSymbolicLink()) continue;

		if (stat.isFile() && entry === config_file_name) {
			config_path = absolute_entry_path

			break
		}
	}

	if (config_path) {
		return config_path
	}

	// do not recurse further if we just scanned root directory
	if (absolute_dir_path === "/" && parent_dir_path === "/") {
		return false
	}

	return nodeFindNearestFile(
		dependencies, config_file_name, parent_dir_path
	)
}

//
// Implemented this way so this module can be imported by a browser
// without error-ing out.
//
async function nodeFindNearestFileFactory() {
	if (!isNode()) {
		return () => {
			throw new Error(`This module cannot be used outside of nodejs.`)
		}
	}

	const {default: fs} = await import("node:fs")
	const {default: path} = await import("node:path")
	const dependencies = {fs, path}

	return (config_file_name: string, dir_path: string) => {
		return nodeFindNearestFile(
			dependencies,
			config_file_name,
			dir_path
		)
	}
}

const impl = await nodeFindNearestFileFactory()

export function nodeFsFindNearestFileSync(
	config_file_name: string,
	dir_path: string
) : string | false {
	return impl(config_file_name, dir_path)
}
