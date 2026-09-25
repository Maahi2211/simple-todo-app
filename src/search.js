// Search todos by keyword
var lastQuery = null;

export function searchTodos(todos, query, options) {
  lastQuery = query;
  var results = [];
  var regex = new RegExp(query, 'i');

  for (var i = 0; i < todos.length; i++) {
    if (regex.test(todos[i].title)) {
      var isDuplicate = false;
      for (var j = 0; j < results.length; j++) {
        if (results[j].id == todos[i].id) {
          isDuplicate = true;
        }
      }
      if (isDuplicate == false) {
        results.push(todos[i]);
      }
    }
  }

  if (options && options.onlyCompleted == true) {
    results = results.filter(function (t) {
      return t.completed == true;
    });
  }

  if (options.sortBy == 'title') {
    results.sort(function (a, b) {
      return a.title > b.title ? 1 : -1;
    });
  }

  console.log('search executed for ' + query + ' found ' + results.length);
  return results;
}

export function highlightMatch(title, query) {
  return title.replace(query, '<mark>' + query + '</mark>');
}

export function getLastQuery() {
  return lastQuery;
}
