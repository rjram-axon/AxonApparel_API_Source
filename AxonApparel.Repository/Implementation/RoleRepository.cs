using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using AxonApparel.Domain;
using System.Data.Entity.Validation;

namespace AxonApparel.Repository
{
    public class RoleRepository : IRoleRepository
    {
        HouseKeepingEntities entities = new HouseKeepingEntities();

        public IQueryable<Role> GetRoleMainDetails()
        {

            IQueryable<Role> query = (from cd in entities.Proc_Apparel_LoginRole()
                                      select new Role
                                      {
                                          RoleId = cd.RoleId,
                                          RoleName = cd.RoleName,
                                          Remarks = cd.Remarks,
                                          //RoleDetList=cd.Role_Det
                                      })
                                            .ToList()
                                            .AsQueryable();
            return query;
        }

        public Role GetRolebyIDALL(int roleid)
        {
            var rmas = new Domain.Role();
            var rdet = new List<Domain.RoleDet>();

            var rmasrst = entities.Proc_Apparel_LoginRoleMasId(roleid).FirstOrDefault();

            //var rdetrst = entities.Role_Det.Where(c => c.RoleId == roleid).ToList();

            var rdetrst = entities.Proc_Apparel_GetRoleRights(roleid);

            if (rdetrst != null)
            {
                foreach (var rst in rdetrst)
                {
                    rdet.Add(new Domain.RoleDet
                    {
                        MenuId = (int)rst.Menuid,
                        RoleMasId = (int)rst.Roleid,
                        //MenuName = entities.MenuList.Where(m => m.MenuId == rst.menuid).Select(c => c.MenuName).FirstOrDefault(),
                        MenuName = rst.menuname,
                        AllFlg = rst.Allflg,
                        AddFlg = rst.addflg,
                        EditFlg = rst.Editflg,
                        DelFlg = rst.DeleteFlg,
                        PrintFlg = rst.Printflg,
                    });
                }
            }

            if (rmasrst != null)
            {
                rmas.RoleId = rmasrst.RoleId;
                rmas.RoleName = (rmasrst.RoleName == null ? "" : rmasrst.RoleName);//rmasrst.RoleName;
                rmas.Remarks = (rmasrst.Remarks == null ? "" : rmasrst.Remarks);//rmasrst.Remarks;
                rmas.RoleDetList = rdet;
            }

            //IQueryable<Role> query = (from cd in entities.Role_Mas
            //                          select new Role
            //                          {
            //                              RoleId = cd.RoleId,
            //                              RoleName = cd.RoleName,
            //                              Remarks = cd.Remarks,
            //                              RoleDetList = rdet
            //                          })
            //                                .ToList()
            //                                .AsQueryable();



            return rmas;
        }
        public Role GetRolebyID(int roleid, int menuid, int submenuid)
        {
            var rmas = new Domain.Role();
            var rdet = new List<Domain.RoleDet>();

            var rmasrst = entities.Proc_Apparel_LoginRoleMasId(roleid).FirstOrDefault();

            //var rdetrst = entities.Role_Det.Where(c => c.RoleId == roleid).ToList();

           // var rdetrst = entities.Proc_Apparel_GetRoleRightsNew(roleid, menuid, submenuid);
            var rdetrst = entities.Proc_Apparel_GetFormRights(menuid, roleid);
            if (rdetrst != null)
            {
                foreach (var rst in rdetrst.ToList())
                {
                    rdet.Add(new Domain.RoleDet
                    {
                        MenuId = (int)rst.MenuId,
                        RoleMasId = (int)rst.RoleId,
                        //MenuName = entities.MenuList.Where(m => m.MenuId == rst.menuid).Select(c => c.MenuName).FirstOrDefault(),
                        //MenuName = rst.Menuname,
                        AllFlg = rst.AllFlg,
                        AddFlg = rst.AddFlg,
                        EditFlg = rst.EditFlg,
                        DelFlg = rst.DeleteFlg,
                        PrintFlg = rst.PrintFlg,
                    });
                }
            }

            if (rmasrst != null)
            {
                rmas.RoleId = rmasrst.RoleId;
                //rmas.RoleName = rmasrst.RoleName;
                //rmas.Remarks = rmasrst.Remarks;

                rmas.RoleName = (rmasrst.RoleName == null ? "" : rmasrst.RoleName);//rmasrst.RoleName;
                rmas.Remarks = (rmasrst.Remarks == null ? "" : rmasrst.Remarks);//rmasrst.Remarks;

                if (rdet.Count == 0) {
                    rdet.Add(new Domain.RoleDet
                    {
                        MenuId = menuid,
                        RoleMasId = roleid,
                        //MenuName = entities.MenuList.Where(m => m.MenuId == rst.menuid).Select(c => c.MenuName).FirstOrDefault(),
                        //MenuName = rst.Menuname,
                        AllFlg =0,
                        AddFlg = 0,
                        EditFlg = 0,
                        DelFlg = 0,
                        PrintFlg = 0,
                    });
                
                }


                rmas.RoleDetList = rdet;
            }

            //IQueryable<Role> query = (from cd in entities.Role_Mas
            //                          select new Role
            //                          {
            //                              RoleId = cd.RoleId,
            //                              RoleName = cd.RoleName,
            //                              Remarks = cd.Remarks,
            //                              RoleDetList = rdet
            //                          })
            //                                .ToList()
            //                                .AsQueryable();



            return rmas;
        }




        public Role GetRolebyIdEdit(int roleid, int menuid, int submenuid)
        {
            var rmas = new Domain.Role();
            var rdet = new List<Domain.RoleDet>();

            var rmasrst = entities.Proc_Apparel_LoginRoleMasId(roleid).FirstOrDefault();

            //var rdetrst = entities.Role_Det.Where(c => c.RoleId == roleid).ToList();

            var rdetrst = entities.Proc_Apparel_GetRoleRightsNew(roleid, menuid, submenuid);
           // var rdetrst = entities.Proc_Apparel_GetFormRights(menuid, roleid);
            if (rdetrst != null)
            {
                foreach (var rst in rdetrst)
                {
                    rdet.Add(new Domain.RoleDet
                    {
                        MenuId = (int)rst.menuid,
                        RoleMasId = (int)rst.roleid,
                        //MenuName = entities.MenuList.Where(m => m.MenuId == rst.menuid).Select(c => c.MenuName).FirstOrDefault(),
                        MenuName = rst.Menuname,
                        AllFlg = rst.Allflg,
                        AddFlg = rst.addflg,
                        EditFlg = rst.Editflg,
                        DelFlg = rst.DeleteFlg,
                        PrintFlg = rst.Printflg,
                    });
                }
            }

            if (rmasrst != null)
            {
                rmas.RoleId = rmasrst.RoleId;
                //rmas.RoleName = rmasrst.RoleName;
                //rmas.Remarks = rmasrst.Remarks;

                rmas.RoleName = (rmasrst.RoleName == null ? "" : rmasrst.RoleName);//rmasrst.RoleName;
                rmas.Remarks = (rmasrst.Remarks == null ? "" : rmasrst.Remarks);//rmasrst.Remarks;

                rmas.RoleDetList = rdet;
            }

            //IQueryable<Role> query = (from cd in entities.Role_Mas
            //                          select new Role
            //                          {
            //                              RoleId = cd.RoleId,
            //                              RoleName = cd.RoleName,
            //                              Remarks = cd.Remarks,
            //                              RoleDetList = rdet
            //                          })
            //                                .ToList()
            //                                .AsQueryable();



            return rmas;
        }





        //public IQueryable<Domain.MenuList> GetMenuList()
        //{

        //    IQueryable<Domain.MenuList> query = (from cd in entities.Proc_Apparel_GetMenuList()
        //                                         select new Domain.MenuList
        //                                         {
        //                                             MenuId = cd.Menuid,
        //                                             MenuName = cd.MenuName,
        //                                             AllFlg = cd.Allflg,
        //                                             AddFlg = cd.Addflg,
        //                                             EditFlg = cd.Editflg,
        //                                             DelFlg = cd.Delflg,
        //                                             PrintFlg = cd.Printflg
        //                                         }).ToList().AsQueryable();
        //    return query;
        //}

        public IQueryable<Domain.MenuList> GetMenuList(int roleid, int menuid, int submenuid)
        {

            IQueryable<Domain.MenuList> query = (from cd in entities.Proc_Apparel_GetRoleRightsNewAdd(roleid, menuid, submenuid)
                                                 select new Domain.MenuList
                                                 {
                                                     MenuId = (int)cd.menuid,
                                                     MenuName = cd.Menuname,
                                                     AllFlg = cd.Allflg,
                                                     AddFlg = cd.addflg,
                                                     EditFlg = cd.Editflg,
                                                     DelFlg = cd.DeleteFlg,
                                                     PrintFlg = cd.Printflg,
                                                     RoleMasId = cd.roleid,
                                                 }).ToList().AsQueryable();
            return query;
        }

        public int AddData(Role obj)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var roleMas = new Role_Mas();
                    var RoleDet = new List<Repository.Role_Det>();

                    roleMas.RoleName = obj.RoleName;
                    roleMas.Remarks = obj.Remarks;

                    entities.Role_Mas.Add(roleMas);
                    entities.SaveChanges();
                    var rid = roleMas.RoleId;

                    if (obj.RoleDetList != null && obj.RoleDetList.Count > 0)
                    {
                        foreach (var item in obj.RoleDetList)
                        {
                            RoleDet.Add(new Repository.Role_Det
                            {
                                RoleId = rid,
                                MenuId = item.MenuId,
                                AllFlg = item.AllFlg,
                                AddFlg = item.AddFlg,
                                EditFlg = item.EditFlg,
                                DeleteFlg = item.DelFlg,
                                PrintFlg = item.PrintFlg
                            });
                        }
                    }

                    foreach (var rdet in RoleDet)
                    {
                        entities.Role_Det.Add(rdet);
                        entities.SaveChanges();
                    }

                    //The Transaction will be completed
                    txscope.Complete();
                    return 1;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return 0;
                    throw ex;
                }
            }
        }

        public bool UpdateRole(Domain.Role RoleUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {

                    var roleMas = new Role_Mas();
                    var RoleDet = new List<Repository.Role_Det>();

                    var roleobj = entities.Role_Mas.Where(d => d.RoleId == RoleUpd.RoleId).FirstOrDefault();
                    if (roleobj != null)
                    {
                        roleobj.RoleName = RoleUpd.RoleName;
                        roleobj.Remarks = RoleUpd.Remarks;
                    }
                    entities.SaveChanges();

                    var roledetobj = entities.Role_Det.Where(d => d.RoleId == RoleUpd.RoleId).ToList();
                    if (roledetobj != null)
                    {
                        foreach (var item in roledetobj)
                        {
                            if (item.RoleId > 0)
                            {
                                foreach (var upditem in (RoleUpd.RoleDetList.Where(e => e.MenuId == item.MenuId)))
                                {
                                    item.AllFlg = upditem.AllFlg;
                                    item.AddFlg = upditem.AddFlg;
                                    item.EditFlg = upditem.EditFlg;
                                    item.DeleteFlg = upditem.DelFlg;
                                    item.PrintFlg = upditem.PrintFlg;
                                }
                            }
                        }
                    }

                    entities.SaveChanges();


                    if (RoleUpd.RoleDetList != null && RoleUpd.RoleDetList.Count > 0)
                    {
                        foreach (var item in RoleUpd.RoleDetList)
                        {
                            if (item.RoleMasId == 0)
                            {
                                RoleDet.Add(new Repository.Role_Det
                                {
                                    RoleId = RoleUpd.RoleId,
                                    MenuId = item.MenuId,
                                    AllFlg = item.AllFlg,
                                    AddFlg = item.AddFlg,
                                    EditFlg = item.EditFlg,
                                    DeleteFlg = item.DelFlg,
                                    PrintFlg = item.PrintFlg
                                });
                            }
                        }
                    }

                    foreach (var rdet in RoleDet)
                    {
                        entities.Role_Det.Add(rdet);
                        entities.SaveChanges();
                    }

                    //var roledet = new List<Repository.Role_Det>();

                    ////Add New Menu in Role_Det Begin
                    //if (RoleUpd.RoleDetList.Count > roledetobj.Count)
                    //{
                    //    foreach (var item in RoleUpd.RoleDetList)
                    //    {
                    //        if (item.AllFlg == 1 || item.AddFlg == 1 || item.EditFlg == 1 || item.DelFlg == 1 || item.PrintFlg == 1)
                    //        {
                    //            var diffele = entities.Role_Det.Where(r => r.MenuId == item.MenuId && r.RoleId == item.RoleMasId).FirstOrDefault();
                    //            if (diffele == null)
                    //            {
                    //                roledet.Add(new Repository.Role_Det
                    //                {
                    //                    RoleId = RoleUpd.RoleId,//item.RoleMasId,
                    //                    MenuId = item.MenuId,
                    //                    AllFlg = item.AllFlg,
                    //                    AddFlg = item.AddFlg,
                    //                    EditFlg = item.EditFlg,
                    //                    DeleteFlg = item.DelFlg,
                    //                    PrintFlg = item.PrintFlg
                    //                });
                    //            }
                    //        }
                    //    }

                    //    foreach (var rdet in roledet)
                    //    {
                    //        entities.Role_Det.Add(rdet);
                    //        entities.SaveChanges();
                    //    }
                    //}
                    //Add New Menu in Role_Det End

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;
                }
                catch (DbEntityValidationException ex)
                {
                    txscope.Dispose();
                    // Retrieve the error messages as a list of strings.
                    var errorMessages = ex.EntityValidationErrors
                    .SelectMany(x => x.ValidationErrors)
                    .Select(x => x.ErrorMessage);

                    // Join the list to a single string.
                    var fullErrorMessage = string.Join("; ", errorMessages);

                    // Combine the original exception message with the new one.
                    var exceptionMessage = string.Concat(ex.Message, " The validation errors are: ", fullErrorMessage);

                    // Throw a new DbEntityValidationException with the improved exception message.
                    throw new DbEntityValidationException(exceptionMessage, ex.EntityValidationErrors);
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    return false;
                    throw ex;
                }
            }
        }

        public bool DeleteRole(int Roleid)
        {
            try
            {
                var RoleMas = entities.Role_Mas.Where(c => c.RoleId == Roleid).FirstOrDefault();
                if (RoleMas != null)
                {
                    var Roledet = entities.Role_Det.Where(c => c.RoleId == Roleid).ToList();
                    if (Roledet != null)
                    {
                        var deleteroledet = entities.Role_Det.Where(c => c.RoleId == Roleid).ToList<Role_Det>();
                        deleteroledet.ForEach(c => entities.Role_Det.Remove(c));
                        entities.SaveChanges();

                        entities.Role_Mas.Remove(RoleMas);
                        entities.SaveChanges();
                    }
                }
                return true;
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }

        public bool CheckRinUser(int Roleid)
        {
            try
            {
                var chk = entities.Proc_Apparel_LoginCheckRinUser(Roleid).FirstOrDefault();
                if (chk != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception ex)
            {
                return false;
                throw ex;
            }
        }
        public IQueryable<Domain.MenuList> LoadMenuDetail()
        {
            var query = (from YD1 in entities.Proc_Apparel_LoginMenuListParent()

                         select new Domain.MenuList
                         {
                             MenuName = YD1.MenuName,
                             MenuId = YD1.MenuId,
                         }).ToList().AsQueryable();


            return query;
        }
        public IQueryable<Domain.MenuList> LoadSubMenuDetail(int parentid)
        {
            var query = (from YD1 in entities.vw_menuname.Where(u => u.MainMenuid == parentid)
                         select new Domain.MenuList
                         {
                             MenuName = YD1.menuname,
                             MenuId = YD1.menuid,
                         }).ToList().AsQueryable();


            return query;
        }
        public IQueryable<Domain.MenuList> CheckRolebyId(int roleid, int menuid, int submenuid)
        {

            IQueryable<Domain.MenuList> query = (from cd in entities.Proc_Apparel_LoginRoleDet(roleid, menuid)
                                                 select new Domain.MenuList
                                                 {
                                                     MenuId = (int)cd.MenuId,                                                    
                                                     AllFlg = cd.AllFlg,
                                                     AddFlg = cd.AddFlg,
                                                     EditFlg = cd.EditFlg,
                                                     DelFlg = cd.DeleteFlg,
                                                     PrintFlg = cd.PrintFlg,
                                                     RoleMasId = cd.RoleId,
                                                 }).ToList().AsQueryable();
            return query;
        }
    }
}
