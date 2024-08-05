using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Common;
using AxonApparel.Repository;

namespace AxonApparel.Business
{
    public class RoleBusiness : IRoleBusiness
    {
        private IRoleRepository strrep = new RoleRepository();

        public Response<IQueryable<Domain.Role>> GetRoleMainDetailsBuss()
        {
            var strlist = strrep.GetRoleMainDetails().ToList().AsQueryable();

            return new Response<IQueryable<Domain.Role>>(strlist.Select(m => new Domain.Role
            {
                RoleId = m.RoleId,
                RoleName = m.RoleName,
                Remarks = m.Remarks
                //RoleDetList=m.Role_Det,
            }), Status.SUCCESS, "Fetched Successfully");
        }

        public Response<Domain.Role> GetRolebyId(int roleid, int menuid, int submenuid)
        {
            var strlist = strrep.GetRolebyID(roleid, menuid, submenuid);

            return new Response<Domain.Role>(strlist, Status.SUCCESS, "Fetched Successfully");
            //return new Response<IQueryable<Domain.Role>>(strlist.Select(m => new Domain.Role
            //{
            //    RoleId = m.RoleId,
            //    RoleName = m.RoleName,
            //    Remarks = m.Remarks,
            //    RoleDetList=m.RoleDetList
            //}), Status.SUCCESS, "Fetched Successfully");
        }
        public Response<Domain.Role> GetRolebyIdEdit(int roleid, int menuid, int submenuid)
        {
            var strlist = strrep.GetRolebyIdEdit(roleid, menuid, submenuid);

            return new Response<Domain.Role>(strlist, Status.SUCCESS, "Fetched Successfully");
            //return new Response<IQueryable<Domain.Role>>(strlist.Select(m => new Domain.Role
            //{
            //    RoleId = m.RoleId,
            //    RoleName = m.RoleName,
            //    Remarks = m.Remarks,
            //    RoleDetList=m.RoleDetList
            //}), Status.SUCCESS, "Fetched Successfully");
        }

        public Response<Domain.Role> GetRolebyIdAll(int roleid)
        {
            var strlist = strrep.GetRolebyIDALL(roleid);

            return new Response<Domain.Role>(strlist, Status.SUCCESS, "Fetched Successfully");
            //return new Response<IQueryable<Domain.Role>>(strlist.Select(m => new Domain.Role
            //{
            //    RoleId = m.RoleId,
            //    RoleName = m.RoleName,
            //    Remarks = m.Remarks,
            //    RoleDetList=m.RoleDetList
            //}), Status.SUCCESS, "Fetched Successfully");
        }

        public Response<IQueryable<Domain.MenuList>> GetMenuList(int roleid, int menuid, int submenuid)
        {
            var strlist = strrep.GetMenuList(roleid, menuid, submenuid).ToList().AsQueryable();

            return new Response<IQueryable<Domain.MenuList>>(strlist.Select(m => new Domain.MenuList
            {
                MenuId = m.MenuId,
                MenuName = m.MenuName,
                AllFlg = m.AllFlg,
                AddFlg = m.AddFlg,
                EditFlg = m.EditFlg,
                DelFlg = m.DelFlg,
                PrintFlg = m.PrintFlg,
                RoleMasId=m.RoleMasId,
                RoleDetId=m.RoleDetId,
            }), Status.SUCCESS, "Fetched Successfully");
        }

        public Response<int> CreateRole(Domain.Role RoleAdd)
        {
            try
            {
                return new Response<int>(strrep.AddData(new Domain.Role
                {
                    RoleName = RoleAdd.RoleName,
                    Remarks = RoleAdd.Remarks,
                    RoleDetList = RoleAdd.RoleDetList
                }), Status.SUCCESS, "Added Successfully");
            }
            catch (Exception)
            {
                return new Response<int>(0, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> UpdateRole(Domain.Role RoleUpd)
        {
            try
            {
                return new Response<bool>(strrep.UpdateRole(new Domain.Role
                {
                    RoleId = RoleUpd.RoleId,
                    RoleName = RoleUpd.RoleName,
                    Remarks = RoleUpd.Remarks,
                    RoleDetList = RoleUpd.RoleDetList,
                }), Status.SUCCESS, "Updated Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Common.Response<bool> CheckRoleinUser(int Roleid)
        {
            try
            {
                return new Response<bool>(strrep.CheckRinUser(Roleid), Status.SUCCESS, "Checked Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<bool> Delete(int Roleid)
        {
            try
            {
                return new Response<bool>(strrep.DeleteRole(Roleid), Status.SUCCESS, "Deleted Successfully");
            }
            catch (Exception)
            {
                return new Response<bool>(false, Status.ERROR, "OOPS error occured... Please try again");
            }
        }

        public Response<IQueryable<Domain.MenuList>> LoadMenuDetail()
        {
            try
            {

                var LoadMenuDetail = strrep.LoadMenuDetail().ToList().AsQueryable(); ;

                return new Response<IQueryable<Domain.MenuList>>(LoadMenuDetail.Select(m => new Domain.MenuList
                {
                    MenuName = m.MenuName,
                    MenuId = m.MenuId,
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MenuList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }

        public Response<IQueryable<Domain.MenuList>> LoadSubMenuDetail(int parentid)
        {
            try
            {

                var LoadSubMenuDetail = strrep.LoadSubMenuDetail(parentid).ToList().AsQueryable(); ;

                return new Response<IQueryable<Domain.MenuList>>(LoadSubMenuDetail.Select(m => new Domain.MenuList
                {
                    MenuName = m.MenuName,
                    MenuId = m.MenuId,
                }), Status.SUCCESS, "Fetched Successfully");

            }
            catch (Exception)
            {
                return new Response<IQueryable<Domain.MenuList>>(null, Status.ERROR, "OOPS error occured. Plase try again");
            }
        }
        public Response<IQueryable<Domain.MenuList>> CheckRolebyId(int roleid, int menuid, int submenuid)
        {
            var strlist = strrep.CheckRolebyId(roleid, menuid, submenuid).ToList().AsQueryable();

            return new Response<IQueryable<Domain.MenuList>>(strlist.Select(m => new Domain.MenuList
            {
                MenuId = m.MenuId,
                MenuName = m.MenuName,
                AllFlg = m.AllFlg,
                AddFlg = m.AddFlg,
                EditFlg = m.EditFlg,
                DelFlg = m.DelFlg,
                PrintFlg = m.PrintFlg,
                RoleMasId = m.RoleMasId,
                RoleDetId = m.RoleDetId,
            }), Status.SUCCESS, "Fetched Successfully");
        }
    }
}
