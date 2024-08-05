using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IRoleBusiness
    {
        Response<IQueryable<Domain.Role>> GetRoleMainDetailsBuss();
        Response<IQueryable<Domain.MenuList>> GetMenuList(int roleid, int menuid, int submenuid);
        Response<IQueryable<Domain.MenuList>> CheckRolebyId(int roleid, int menuid, int submenuid);
        Response<int> CreateRole(Domain.Role RoleAdd);
        Response<Domain.Role> GetRolebyId(int roleid, int menuid, int submenuid);
        Response<Domain.Role> GetRolebyIdEdit(int roleid, int menuid, int submenuid);
        Response<Domain.Role> GetRolebyIdAll(int roleid);
        Common.Response<bool> UpdateRole(Domain.Role RoleUpd);
        Common.Response<bool> CheckRoleinUser(int Roleid);
        Response<bool> Delete(int Roleid);
        Response<IQueryable<Domain.MenuList>> LoadMenuDetail();
        Response<IQueryable<Domain.MenuList>> LoadSubMenuDetail(int parentid);
       
    }
}
