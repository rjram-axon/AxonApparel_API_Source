using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Domain;

namespace AxonApparel.Repository
{
    public interface IRoleRepository
    {
        IQueryable<Role> GetRoleMainDetails();
        IQueryable<Domain.MenuList> GetMenuList(int roleid, int menuid, int submenuid);
        IQueryable<Domain.MenuList> CheckRolebyId(int roleid, int menuid, int submenuid);
        int AddData(Role obj);
        Role GetRolebyID(int roleid, int menuid, int submenuid);
        Role GetRolebyIdEdit(int roleid, int menuid, int submenuid);
        bool UpdateRole(Domain.Role RoleUpd);
        bool CheckRinUser(int Roleid);
        bool DeleteRole(int Roleid);
        Role GetRolebyIDALL(int roleid);
        IQueryable<Domain.MenuList> LoadMenuDetail();
        IQueryable<Domain.MenuList> LoadSubMenuDetail(int parentid);
       
    }
}
