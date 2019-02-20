class Cookies {
	static get (name) {
		if (document.cookie.length === 0)
			return null;

		var c_start = document.cookie.indexOf(`${name}=`);
		if (c_start === -1)
			return null;

		c_start = c_start + name.length + 1;
		var c_end = document.cookie.indexOf(';', c_start);		
		if (c_end == -1)
			c_end = document.cookie.length;

		return decodeURIComponent( document.cookie.substring(c_start, c_end) );
	}

	static set (name, value, hours) {
		if (hours > 0) {
            let now = new Date();
            now.setTime(now.getTime() + hours * 3600 * 1000)
            let date = now.toUTCString();
			document.cookie = name + `=${encodeURIComponent(value)}; expires=${date}; path=/`;
		} else {		
			document.cookie = name + `=${encodeURIComponent(value)}; path=/`
		}
	}

	static remove (name) {
		if (name)
			document.cookie = name + `=''; expires=${new Date(1).toUTCString()}`;
	}

	static getAll () {
		if (document.cookie.length === 0)
			return null;
		var cookies = {};
		document.cookie.split(';').forEach(pairs => {
			let pair = pairs.split('=');
			cookies[ (pair[0]+'').trim() ] = decodeURIComponent(pair[1])
		})
		return cookies
	}

	static check (name) {
		name = this.get(name);
		return (name && name !== '') ? true : false;
	}
}