const StudentCard = ({ image, name, role }) => (
    <div className="text-center">
      <img src={image} alt={name} className="student-image mx-auto mb-4" />
      <h3 className="text-xl font-semibold">{name}</h3>
      <p className="text-gray-600">{role}</p>
    </div>
  );

  export default StudentCard; 