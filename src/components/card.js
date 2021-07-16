const Card = ({ data }) => {
    let { thumbnail } = data
    return (
        <div>
            <input type="checkbox"  />
            <p style={{ backgroundColor: 'purple', padding: '8px 5px' }} >
                {data.title}
            </p>
            <label>
                <img src={`${thumbnail.path}.${thumbnail.extension}`} />
            </label>
        </div>
    )
}
export default Card;