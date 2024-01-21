const fet = async () => {
    try {
        const data = await Promise.all(magazines.map(async (elem) => {
            let x = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${elem}`);
            return x.json(); // Assuming you want to parse the response as JSON
        }));
        console.log(data)
        return data;
    } catch (error) {
        // Handle any errors that may occur during the fetch
        console.error(error);
        throw error; // Rethrow the error to propagate it
    }
};

async function initialize() {
    try {
        const newData = await fet();
        addAccordionToDOM(newData);
    } catch (error) {
        // Handle any errors that may occur
        console.error(error);
    }
}

initialize();

function addAccordionToDOM(data) {
    let accordionPanelsStayOpenExample = document.querySelector("#accordionPanelsStayOpenExample")
    let counter = 1
    data.forEach((elem,index) => {
        let div = document.createElement("div")
        div.classList = "accordion-item"
        div.id = `accordion-item${counter}`
        div.innerHTML = `<h2 class="accordion-header">
        <button class="accordion-button ${index==0? "" : "collapsed"}" type="button" data-bs-toggle="collapse"
          data-bs-target="#panelsStayOpen-collapse${counter}" aria-expanded="${index==0 ? "true" : "false"}"
          aria-controls="panelsStayOpen-collapse${counter}">
          ${elem.feed.title}
        </button>
      </h2>
      <div id="panelsStayOpen-collapse${counter}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}">
        <div class="accordion-body p-0">
          <div id="carousel${counter}" class="carousel slide">
            <div class="carousel-inner" id = "carousel-inner${counter}">
              <div class="carousel-item active">
                <div class="card">
                  <img src="https://picsum.photos/id/${counter}/1080/720" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${elem.items[index].title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${elem.items[index+1].author}</h6>
                    <p class="card-text">${elem.items[index+1].description}</p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="card" id="firstNews">
                  <img src="https://picsum.photos/id/23${counter}/1080/720" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${elem.items[index+1].title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${elem.items[index+1].author}</h6>
                    <p class="card-text">${elem.items[index+1].description}</p>
                  </div>
                </div>
              </div>
              <div class="carousel-item">
                <div class="card">
                  <img src="https://picsum.photos/id/2${counter}/1080/720" class="card-img-top">
                  <div class="card-body">
                    <h5 class="card-title">${elem.items[index+1].title}</h5>
                    <h6 class="card-subtitle mb-2 text-body-secondary">${elem.items[index+1].author}</h6>
                    <p class="card-text">${elem.items[index+1].description}</p>
                  </div>
                </div>
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carousel${counter}"
              data-bs-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carousel${counter}"
              data-bs-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>

        </div>
      </div>`
      counter++
      accordionPanelsStayOpenExample.append(div)
      
    })
   
}
