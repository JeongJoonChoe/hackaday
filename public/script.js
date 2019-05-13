( () => {
    const nextButton = document.getElementById("next-button");
    const prevButton = document.getElementById("prev-button");

    let page = getCurrentPage() || 1;

    nextButton.addEventListener("click", e => {
        page++;
        history.pushState({"html": document.getElementById("project-container").innerHTML, "pageTitle": "Hackaday Projects", "curPage": page}, 'Title of the page', "/projects/page/" +  page);
        fetch(`/projects/page/${page}?client=true`)
        .then(response => {
            // console.log(response);
            return response.text();
        })
        .then( body => {
            return document.getElementById("project-container").innerHTML = body;
        })
        .then( () => getUserInfo() );
    });

    prevButton.addEventListener("click", e => {
        if (page === 1) {
            return;
        }
        page--;
        history.pushState({"html": document.getElementById("project-container").innerHTML, "pageTitle": "Hackaday Projects", "curPage": page}, 'Title of the page', "/projects/page/" +  page);
        fetch(`/projects/page/${page}?client=true`)
        .then(response => {
            // console.log(response);
            return response.text();
        })
        .then( body => {
            return document.getElementById("project-container").innerHTML = body;
        })
        .then( () => getUserInfo() );
    })

    function getCurrentPage() {
       if (window.location.pathname.length > 14) {
           return parseInt(window.location.pathname.substring(15));
       }
    }

    function getUserInfo() {
        const users = document.getElementsByClassName('user');
        let userIDs = [];

        for (let i = 0; i < users.length; i++) {
            userIDs.push(users[i].id);
        }

        fetch(`/users/batch?ids=${userIDs.join(',')}`)
        .then(response => {
            return response.json();
        })
        .then( data => {
            data.forEach( user => {
                let userElement = document.getElementById(`${user.id}`);
                userElement.addEventListener('mouseenter', e => {
                    let userHTML = `<div class="user-info">
                                        <img src="${user.image_url}" alt="user photo">
                                        <span>Owner: ${user.screen_name}</span>
                                        <span>Rank: ${user.rank}</span>
                                    </div>`
                    userElement.innerHTML = userHTML;
                })
                userElement.addEventListener('mouseleave', e => {
                    userElement.innerHTML = 'View More Info';
                })
            })
        })
    }

    getUserInfo();
    
})();
