import { setFormListener, setModalOnClickListener } from './view';

/**
 * Inits the aplication setting the form listeners and the modal listener
 */
export function init() {
	setFormListener(handleSubmit);
	setModalOnClickListener();
}

/**
 * TODO: Set the callback that must be executed when the form is submited.
 * - should display loading when loading
 * - should display the error when the request fails
 * - should display the table when the request succeds
 */
async function handleSubmit(event) {
	// ...
}
