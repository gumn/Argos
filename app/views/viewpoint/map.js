function(o) {
  if (o.viewpoint_name) {
    //viewpoint name
    emit([o._id], {name:o.viewpoint_name});
    //viewpoint users
    for each (var u in o.users) {
      emit([o._id], {user:u});
    }
    //topics
    const topics = o.topics;
    for (var t in topics) {
      //topic name
      emit([o._id, t], {name:topics[t].name});
      //topic links
      var broader = topics[t].broader;
      if (broader==null || broader.length==0) {
        emit([o._id], {upper:{id:t, name:topics[t].name}});
      } else for each(b in broader) {
        emit([o._id, t], {broader: {id:b, name:topics[b].name}});
        emit([o._id, b], {narrower: {id:t, name:topics[t].name}});
      }
    }
  }
}
