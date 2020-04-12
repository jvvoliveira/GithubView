import { getUser, getReposByUser } from "../../services/index";

const _pesquisar = async (
    showLoading,
    hideLoading,
    nomeUsuario,
    setUsuario,
    setRepos,
    setRepos_max,
    setPage
) => {
    showLoading("Carregando...");
    try {
        const user = await getUser(nomeUsuario);
        const repos = await getReposByUser(nomeUsuario, 1);
        setUsuario(user.data, "OK");
        setRepos_max(user.data.public_repos);
        setRepos(repos.data, "OK");

        setPage(2);
    } catch (error) {
        if (error.response.status === 404) {
            setUsuario(null, "not found");
            setRepos([], "not found");
        }
    }
    hideLoading();
};

export default _pesquisar;