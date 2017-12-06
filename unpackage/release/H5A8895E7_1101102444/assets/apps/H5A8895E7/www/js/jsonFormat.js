function PagingJsonChange(data) {
	data = data.replace("\"DataSource\":{", "\"DataSource\": ");
	return eval('(' + data + ')');
}