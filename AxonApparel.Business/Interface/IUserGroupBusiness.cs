using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Domain;

namespace AxonApparel.Business
{
    public interface IUserGroupBusiness
    {
        Response<int> CreateGroup(UserGroup GroupId);
        Response<int> CreateUser(UserName UserId);
        Response<UserGroup> GetGroupId(int Grpid);
        Response<UserName> GetUserId(int Urid);
        Response<bool> UpdateGroup(UserGroup GrpUpd);
        Response<bool> UpdateUser(UserName UrpUpd);
        Response<IEnumerable<UserGroup>> GetGroupName();
        Response<IEnumerable<UserName>> GetUser();
        Response<bool> GroupDelete(int Grpdel);
        Response<bool> UserDelete(int urdel);
        Response<IQueryable<UserGroup>> GetGrpNme(int GrpID);    
    }
}
