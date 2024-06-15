/*
DESCRIPTION: Dynamically load html content. No good error handeling as I have not covered this yet.
ARGUMENTS:
    (1) - the path to the html file e.g. foler/test.html
    (2) - the id of the html element that will contain the content
*/
function load_content(path, container, callback){
    const req = new Request(path);

    fetch(req).then((response) => {
        if(response.ok){
            response.text().then(data =>{
                document.getElementById(container).innerHTML = data;
                callback();
            });
        }
        else{
            console.log("file not found");
        }
    });
}