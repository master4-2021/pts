const getProfileQuery = (name: string) => {
  return `SELECT e.EmployeeId , e.Name , e.DisplayName , e.DepartmentId , ur.RoleName , e.RoleId , d.DepartmentName , e.Email, e.SectionId , s.SectionName  FROM PTS.Employee e
LEFT JOIN PTS.UserRole ur  ON e.RoleId  = ur.RoleId 
LEFT JOIN PTS.Department d ON e.DepartmentId = d.DepartmentId 
LEFT JOIN PTS.[Section] s ON e.SectionId = s.SectionId 
WHERE e.Name = '${name}'
`;
};

export { getProfileQuery };
