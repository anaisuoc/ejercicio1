const $form = document.querySelector('#search-form');
const $results = document.querySelector('#results');
const $selectYear = document.querySelector('#year-select');
const $stageSelect = document.querySelector('#stage-select');
const $modalWrapper = document.querySelector('#modal-wrapper');
const $modal = document.querySelector('#modal');

export function getSelectedYear() {
	return $selectYear.value;
}

export function getSelectedStage() {
	return $stageSelect.value;
}

export function setFormListener(callback) {
	$form.addEventListener('submit', callback);
}

export function setModalOnClickListener() {
	$modalWrapper.addEventListener('click', _hideModal);
}

/**
 * Cleans the results
 */
export function clearResults() {
	$results.innerHTML = '';
	const $thead = _createTheadElement();
	$results.appendChild($thead);
}

/**
 * TODO: Display loading text
 */
export function setLoading() {}

/**
 * Sets an error whe happes
 * @param {*} err
 */
export function setError(err) {
	$results.innerHTML = err.toString();
}

/**
 * Adds a result to the table
 * @param {Result} result
 */
export function addResult(result) {
	const tr = _createResult(result);
	$results.appendChild(tr);
}

/**
 * TODO: Creates a new table row with the click listener attached
 * @param {Result} result
 */
function _createResult(result) {
	const tr = document.createElement('tr');

	// TODO Complete code here

	return tr;
}

function _createTheadElement() {
	const thead = document.createElement('thead');

	thead.innerHTML = `
		<tr>
			<th>Position</th>
			<th>Driver</th>
			<th>Constructor</th>
			<th>Time</th>
			<th>Points</th>
		</tr>
	`;

	return thead;
}

/**
 * Shows the modal modifiying the data-isVisible attribute
 */
function _showModal() {
	$modalWrapper.setAttribute('data-isVisible', true);
}

/**
 * TODO: Hides the modal.
 *
 * - Should only hide the modal when the user clicks on the modal Wrapper (not the modal itself!)
 */
function _hideModal(e) {}
