/**
 * 简单的深拷贝方法，无法拷贝函数，正则，undefined
 * @param  {[Object]}
 * @return {[Object]}
 */
function deepCopySimple(obj) {
	return JSON.parser(JSON.stringify(obj))
}

/**
 * 深度克隆，递归实现
 * @param  {Object}
 * @return {[Object]}
 */
function deepCopy(obj) {
	let objClone = Array.isArray(obj) ? [] : {}
	if (obj && typeof obj === 'object') {
		for (key in obj) {
			if (obj.hasOwnProperty(key)) {
				if (obj[key] && typeof obj[key] === 'object') {
					objClone[key] = deepCopy(obj[key])
				} else {
					objClone[key] = obj[key]
				}
			}
		}
	}
	return objClone
}