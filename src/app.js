function fetchRepos() {
    const username = document.getElementById('username').value;
    if (!username) {
        alert('Please enter a GitHub username');
        return;
    }

    const url = `https://api.github.com/users/${username}/repos`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No response from GitHub API');
            }
            return response.json();
        })
        .then(repos => {
            const repoList = document.getElementById('repo-list');
            repoList.innerHTML = ''; // Clear previous results

            if (repos.length === 0) {
                repoList.innerHTML = '<p>No repositories found.</p>';
                return;
            }

            const list = document.createElement('ul');
            repos.forEach(repo => {
                const listItem = document.createElement('li');
                listItem.textContent = `${repo.name} - Stars: ${repo.stargazers_count}`;
                list.appendChild(listItem);
            });
            repoList.appendChild(list);
        })
        .catch(error => {
            document.getElementById('repo-list').innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
