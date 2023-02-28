export function setExpirationDate(days) {
  var date = new Date(Date.now());
  date.setDate(date.getDate() + days);
  return date;
}

export function storeWithDate(key, value, days) {
	const item = {
		value: value,
		expiry: setExpirationDate(days),
	}
	localStorage.setItem(key, JSON.stringify(item))
}

export function getWithDate(key) {
	const itemStr = localStorage.getItem(key)
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	if (now.getTime() > item.expiry) {
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

export function blobToBase64(blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

export function formatPrettyURL(string) {
  //slugify
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìıİłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

export function decodeURL(string) {
  return string.toString().replaceAll("-", " ");
}

export function buildFilterURL(reqData) {
  let url = "?Keyword=" + reqData.keyword;
  if (reqData.page > 1) {
    url += "&page=" + reqData.page;
  } else {
    url += "&page=1";
  }
  if (reqData.filterModel) {
    if (reqData.filterModel.genres) {
      let mapped = reqData.filterModel.genres.map((item) => item.ID);
      let ids = mapped.join(",");
      url += "&genres=" + ids;
    }
    if (reqData.filterModel.country) {
      url += "&country=" + reqData.filterModel.country;
    }
    if (reqData.filterModel.author) {
      url += "&author=" + reqData.filterModel.author;
    }
  }
  return url;
}

export function hostMediaUrl() {
  return "http://95.217.210.225:477/static/listing";
}
