import './addRemoveBeat.css'

const AddRemoveBeat = ({ setMaxBeats }) => {
    const addBeat = () => {
        setMaxBeats(old => (old + 1))
    };

    const removeBeat = () => {
        setMaxBeats(old => (old - 1))
    }
    return (
        <div className='add-remove-container'>
            <button className="add-remove-button" type="button" onClick={removeBeat}>- </button>
            <button className="add-remove-button" type="button" onClick={addBeat}>+ </button>
        </div>
    )
};

export default AddRemoveBeat;