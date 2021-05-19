export function pp1(conectados) {
	// Patron de busqueda
	var patroLi = ".media.media--profile";
	if (conectados === true) {
		patroLi = ".media.media--profile.on";
	} else if (conectados === false) {
		patroLi = ".media.media--profile.off";
	}

	var estudiantes = [];
	// Buscamos los estudiantes con el patron adecuado
	var liList = document.querySelectorAll(patroLi);
	for (let item of liList) {
		const name = document.querySelector(".media.media--profile.user").innerHTML;

	}
}



export function pp2() {

}

const exercises = {
	pp1,
	pp2,
};

export default exercises;
