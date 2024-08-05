using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using AxonApparel.Domain;
using AxonApparel.Common;
//using AxonApparel.Business.Implementation;

namespace AxonApparel.Business
{
    public class UserGroupBusiness : IUserGroupBusiness
    {
        IUserGroupRepository Ugrepo = new UserGroupRepository();

        public Response<int> CreateGroup(Domain.UserGroup GroupId)
        {
            try
            {
                return new Response<int>(Ugrepo.AddDataGroup(new AxonApparel.Repository.UserGroup
                {
                    GroupId = GroupId.GroupId,
                    GroupName = GroupId.GroupName,
                    Description = GroupId.Description,
                    GroupType = GroupId.GroupType
                }), Status.SUCCESS, "Added Successfully");
            }

            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<int> CreateUser(Domain.UserName UserId)
        {
            try
            {
                //var keyNew = Help.GeneratePassword(10);
                //var password = Help.EncodePassword(UserId.Password, keyNew);
                var password = Help.Encrypt(UserId.Password);
                return new Response<int>(Ugrepo.AddDataUser(new AxonApparel.Repository.Username
                {
                    UserId = UserId.UserId,
                    Username1 = UserId.Username,
                    Groupid = UserId.GroupId,
                    Grouptype = UserId.Grouptype,
                    Password = password,
                    //ConPassword = password,
                    //VCode = keyNew,
                    EmployeeId = UserId.EmployeeId,
                    Question = UserId.Question,
                    Answer = UserId.Answer,
                    ChangePass = UserId.ChangePass,
                    Roleid=UserId.Roleid,
                    UnitId=UserId.UnitId,
                    Multiple=UserId.Multiple
                }), Status.SUCCESS, "Added Successfully");
            }
            //catch (System.Data.Entity.Validation.DbEntityValidationException e)
            catch (Exception)
            {
                //this is for EntityValidationErrors
                //foreach (var eve in e.EntityValidationErrors)
                //{

                //    Console.WriteLine("Entity of type \"{0}\" in state \"{1}\" has the following validation errors:",

                //        eve.Entry.Entity.GetType().Name, eve.Entry.State);

                //    foreach (var ve in eve.ValidationErrors)
                //    {

                //        Console.WriteLine("- Property: \"{0}\", Error: \"{1}\"",

                //            ve.PropertyName, ve.ErrorMessage);
                //    }

                //}

                //throw;
                return new Response<int>(0, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.UserGroup>> GetGroupName()
        {
            try
            {
                var GroupNameList = Ugrepo.GetGroupNameList();
                return new Response<IEnumerable<Domain.UserGroup>>(GroupNameList.Select(m => new Domain.UserGroup
                {
                    GroupId = m.GroupId,
                    GroupName = m.GroupName,
                    Description = m.Description,
                    GroupType = m.GroupType,
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.UserGroup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IEnumerable<Domain.UserName>> GetUser()
        {
            try
            {
                var UserList = Ugrepo.GetUserList();
                return new Response<IEnumerable<Domain.UserName>>(UserList.Select(m => new Domain.UserName
                {


                    UserId = (int)(m.UserId == null ? 0 : m.UserId),
                    Username = (m.Username == null ? "" : m.Username),
                    GroupId = (int)(m.GroupId == null ? 0 : m.GroupId),
                    GroupName = (m.GroupName == null ? "" : m.GroupName),
                    Grouptype = (m.Grouptype == null ? "" : m.Grouptype),                
                    Password = m.Password,                  
                    EmployeeId = (int)(m.EmployeeId == null ? 0 : m.EmployeeId),                
                    Employee = (m.Employee == null ? "" : m.Employee),              
                    Question = (m.Question == null ? "" : m.Question),
                    Answer = (m.Answer == null ? "" : m.Answer),              
                    ChangePass = (m.ChangePass == null ? "" : m.ChangePass),
                    Roleid=(int)(m.Roleid==null?0:m.Roleid)
                }), Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<IEnumerable<Domain.UserName>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.UserGroup> GetGroupId(int Grpid)
        {
            try
            {
                var Groupid = Ugrepo.GetGroupById(Grpid);
                return new Response<Domain.UserGroup>(new Domain.UserGroup
                    {
                        GroupId = Groupid.GroupId,
                        GroupName = Groupid.GroupName,
                        Description = Groupid.Description,
                        GroupType = Groupid.GroupType
                    }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.UserGroup>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<Domain.UserName> GetUserId(int Urid)
        {
            try
            {
                var UserId = Ugrepo.GetUserById(Urid);
                var password = Help.Decrypt(UserId.Password);
                return new Response<Domain.UserName>(new Domain.UserName
                    {
                        UserId = (int)(UserId.UserId == null ? 0 : UserId.UserId),
                        Username = (UserId.Username1 == null ? "" : UserId.Username1),
                        GroupId = (int)UserId.Groupid,
                        Grouptype = UserId.Grouptype,
                        Password = password,
                        ConPassword = password,
                        EmployeeId = (int)(UserId.EmployeeId == null ? 0 :UserId.EmployeeId),
                        Question = UserId.Question,
                        Answer = UserId.Answer,
                        ChangePass = UserId.ChangePass,
                        Roleid=(int)(UserId.Roleid==null?0:UserId.Roleid),
                        UnitId=(int)(UserId.UnitId==null?0:UserId.UnitId),
                        Multiple = (int)(UserId.Multiple == null ? 0 : UserId.Multiple)
                    }, Status.SUCCESS, "Fetched Successfully");
            }
            catch (Exception)
            {
                return new Response<Domain.UserName>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> UpdateGroup(Domain.UserGroup GrpUpd)
        {
            return new Response<bool>(Ugrepo.UpdateGroup(new Repository.UserGroup
                {
                    GroupId = GrpUpd.GroupId,
                    GroupName = GrpUpd.GroupName,
                    Description = GrpUpd.Description,
                    GroupType = GrpUpd.GroupType
                }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<bool> UpdateUser(UserName UrpUpd)
        {
            //var keyNew = Help.GeneratePassword(10);
            //var password = Help.EncodePassword(UrpUpd.Password, keyNew);
            var password = Help.Encrypt(UrpUpd.Password);
            return new Response<bool>(Ugrepo.UpdateUser(new Repository.Username
                {
                    UserId = UrpUpd.UserId,
                    Username1 = UrpUpd.Username,
                    Groupid = UrpUpd.GroupId,
                    Grouptype = UrpUpd.Grouptype,
                    Password = password,
                    //ConPassword = password,
                    //VCode = keyNew,
                    EmployeeId = UrpUpd.EmployeeId,
                    Question = UrpUpd.Question,
                    Answer = UrpUpd.Answer,
                    ChangePass = UrpUpd.ChangePass,
                    Roleid=UrpUpd.Roleid,
                    UnitId=UrpUpd.UnitId,
                    Multiple=UrpUpd.Multiple,
                }), Status.SUCCESS, "Updated Successfully");
        }

        public Response<IQueryable<Domain.UserGroup>> GetGrpNme(int GrpID)
        {
            try
            {
                var GrptypeName = Ugrepo.GetGroupName(GrpID);
                return new Response<IQueryable<Domain.UserGroup>>(GrptypeName, Status.SUCCESS, "OK");
            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.UserGroup>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<bool> GroupDelete(int GrpDel)
        {
            return new Response<bool>(Ugrepo.GroupDelete(GrpDel), Status.SUCCESS, "Deleted Successfully");
        }

        public Response<bool> UserDelete(int urdel)
        {
            return new Response<bool>(Ugrepo.UserDelete(urdel), Status.SUCCESS, "Deleted Successfully");
        }    
    }
}
