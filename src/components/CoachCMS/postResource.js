function postResource(resource) {
    fetch(`http://localhost:5000/resources`, {
      method: "post",
      body: JSON.stringify({
        title: resource.title,
        lecturer: resource.lecturer,
        videourl: resource.videoUrl,
        thumbnailurl: resource.thumbnailUrl,
        videodesc: resource.videoDesc
      }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => console.log(data)) 
      // .catch((error) => console.log(error, "my error")); 
  }

  export default postResource;


  