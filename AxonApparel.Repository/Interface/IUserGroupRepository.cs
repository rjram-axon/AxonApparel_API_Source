using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public interface IUserGroupRepository:IBaseRepository<UserGroup>
    {
        int AddDataGroup(UserGroup Grpobj);
        int AddDataUser(Username Urobj);
        UserGroup GetGroupById(int Grpid);
        Username GetUserById(int Urid);
        bool UpdateGroup(UserGroup GrpUpd);
        bool UpdateUser(Username UrpUpd);
        IEnumerable<UserGroup> GetGroupNameList();
        IEnumerable<Domain.UserName> GetUserList();
        bool GroupDelete(int Grpid);
        bool UserDelete(int Urid);
        IQueryable<Domain.UserGroup> GetGroupName(int GrpId);
    }
}
