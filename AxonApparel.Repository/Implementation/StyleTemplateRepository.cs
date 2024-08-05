using AxonApparel.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;

namespace AxonApparel.Repository
{
    public class StyleTemplateRepository : IStyleTemplateRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();


        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<Domain.StyleTemplateMas> GetDataMainList()
        {
            //var query = (from YD in entities.StyleTempMas
            //             select new Domain.StyleTemplateMas
            //             {
            //                 TemplateId = YD.TemplateId,
            //                 Template = YD.Template,
            //                 BuyerId=(int)YD.BuyerId,
            //                 ItemId=(int)YD.ItemId,
            //             }).AsQueryable();
            //return query;


            List<StyleTemplateMas> lstemployee = new List<StyleTemplateMas>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterStyleTempalteLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    StyleTemplateMas employee = new StyleTemplateMas();
                    //employee.StateId = Convert.ToInt32(rdr["StateId"]);
                    //employee.State1 = rdr["State"].ToString();
                    //employee.Lookup = rdr["Lookup"].ToString();
                    //employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);

                    employee.TemplateId = Convert.ToInt32(rdr["TemplateId"]);
                    employee.Template = rdr["Template"].ToString();
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.ItemId = Convert.ToInt32(rdr["ItemId"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public bool AddData(StyleTempMas objAdd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    Repository.StyleTempMas stytempmas = new Repository.StyleTempMas();
                    if (objAdd != null)
                    {
                        stytempmas.Template = objAdd.Template;
                        stytempmas.BuyerId = objAdd.BuyerId;
                        stytempmas.ItemId = objAdd.ItemId;
                    }

                    var id = entities.StyleTempMas.Add(stytempmas);
                    entities.SaveChanges();

                    //StyleTempDet Start
                    var styletempdet = new List<Repository.StyleTempDet>();

                    foreach (var styledet in objAdd.StyleTempDet)
                    {
                        styletempdet.Add(new Repository.StyleTempDet
                        {
                            TemplateId = id.TemplateId,
                            SizeId = styledet.SizeId,
                            ItemId = styledet.ItemId,
                            ColorId = styledet.ColorId,                           
                            SupplierId=(styledet.SupplierId==0?null:styledet.SupplierId),
                            ConvertTypeId=styledet.ConvertTypeId,
                            ConvertTypeName=styledet.ConvertTypeName,
                            Qty = styledet.Qty,
                            Rate = styledet.Rate,
                            GColorid = (styledet.GColorid==0?null:styledet.GColorid),
                            GSizeid = (styledet.GSizeid==0?null:styledet.GSizeid),
                            Type = styledet.Type,
                        });
                    }

                    foreach (var styledetails in styletempdet)
                    {
                        var det = entities.StyleTempDet.Add(styledetails);
                        entities.SaveChanges();
                    }
                    //StyleTempDet End

                    //The Transaction will be completed
                    txscope.Complete();
                    return true;

                    //return id.StyleRowid;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "StyleTemplate-AddData");
                    return false;
                    throw ex;
                }
            }
        }

        public StyleTempMas GetDataById(int id)
        {
            //return entities.StyleTempMas.Where(c => c.TemplateId == id).FirstOrDefault();


            StyleTempMas employee = new StyleTempMas();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from StyleTempMas where TemplateId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.TemplateId = Convert.ToInt32(rdr["TemplateId"]);
                    employee.Template = rdr["Template"].ToString();
                    employee.BuyerId = Convert.ToInt32(rdr["BuyerId"]);
                    employee.ItemId = Convert.ToInt32(rdr["ItemId"]);
                }
            }
            return employee; 
        }

        public bool UpdateData(Repository.StyleTempMas objUpd)
        {
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var App = entities.StyleTempMas.Where(c => c.TemplateId == objUpd.TemplateId).FirstOrDefault();
                    if (App != null)
                    {
                        App.Template = objUpd.Template;
                        App.BuyerId = objUpd.BuyerId;
                        App.ItemId = objUpd.ItemId;                      
                    }
                    entities.SaveChanges();

                    //StyleTempDet Begin
                    var StyleTempDet = new List<Repository.StyleTempDet>();

                    if (objUpd.StyleTempDet.Count > 0)
                    {
                        foreach (var item in objUpd.StyleTempDet)
                        {
                            StyleTempDet.Add(new Repository.StyleTempDet
                            {
                                TemplateId = objUpd.TemplateId,
                                ItemId = item.ItemId,
                                SizeId = item.SizeId,
                                ColorId = item.ColorId,
                                SupplierId = (item.SupplierId == 0 ? null : item.SupplierId),
                                //Supplier=item.Supplier,
                                ConvertTypeId = item.ConvertTypeId,
                                ConvertTypeName = item.ConvertTypeName,
                                Qty = item.Qty,
                                Rate = item.Rate,
                                GColorid = (item.GColorid==0?null:item.GColorid),
                                GSizeid = (item.GSizeid==0?null:item.GSizeid),
                                Type = item.Type,
                            });
                        }
                    }

                    var result = AddStyleDetData(StyleTempDet, "Update");
                    //StyleTempDet End

                    //The Transaction will be completed
                    txscope.Complete();
                    result = true;
                    return result;
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "BuyOrdStyle-UpdateData");
                    return false;
                    throw ex;
                }
            }
        }

        public bool AddStyleDetData(List<StyleTempDet> objCDet, string Mode)
        {
            try
            {
                int Templateid = 0;

                if (Mode == "Update")
                {
                    foreach (var item in objCDet)
                    {
                        Templateid = (int)item.TemplateId;
                        
                    }

                    //delete StyleTempDet Many Rows table
                    var deletestyletemdet = entities.StyleTempDet.Where(d => d.TemplateId == Templateid).ToList<StyleTempDet>();
                    deletestyletemdet.ForEach(c => entities.StyleTempDet.Remove(c));
                    entities.SaveChanges();
                }

                foreach (var item in objCDet)
                {
                    entities.StyleTempDet.Add(item);
                }
                entities.SaveChanges();
                return true;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public IQueryable<Domain.StyleTemplateDet> GetStyleTemp(int id)
        {
            try
            {
                IQueryable<StyleTemplateDet> query = (from T in entities.Proc_Apparel_GetStyleTemplate(id)
                                                      select new StyleTemplateDet
                                                     {
                                                         TemDetId = T.TempDetId,
                                                         TemplateId = T.TemplateId,
                                                         Template = T.Template,
                                                         ColorId = T.ColorId,
                                                         Color = T.Color,
                                                         SizeId = T.SizeId,
                                                         Qty = T.Qty,
                                                         Rate = T.Rate,
                                                         BuyerId = (int)T.BuyerId,
                                                         BuyerName = entities.Buyer.Where(e => e.BuyerId == T.BuyerId).Select(i => i.Buyer1).FirstOrDefault(),
                                                         GItemId = (int)T.GItemId,
                                                         GItem = entities.Item.Where(e => e.ItemId == T.GItemId).Select(i => i.Item1).FirstOrDefault(),
                                                         GColorId = (int)(T.GColorid == null ? 0 : T.GColorid),
                                                         SupplierId = (int)T.SupplierId,
                                                         SupplierName = entities.Supplier.Where(e => e.SupplierId == T.SupplierId).Select(i => i.Supplier1).FirstOrDefault(),
                                                         ConvertTypeId = (int)T.ConvertTypeId,
                                                         ConvertTypeName = T.ConvertTypeName,
                                                         GColor = (T.Gcolor == null ? string.Empty : T.Gcolor),
                                                         GSizeId = (int)(T.GSizeid == null ? 0 : T.GSizeid),
                                                         GSize = (T.GSize == null ? string.Empty : T.GSize),
                                                         Type = T.Type,
                                                         Size = entities.Size.Where(e => e.SizeId == T.SizeId).Select(i => i.size1).FirstOrDefault(),
                                                         Sno = 0,
                                                         ItemId = (int)T.ItemId,
                                                         Item = entities.Item.Where(e => e.ItemId == T.ItemId).Select(i => i.Item1).FirstOrDefault(),
                                                     }).AsQueryable();
                return query;
            }
            catch(Exception ex){
                throw ex;
            }
           
        }


        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.StyleTempDet.Where(c => c.TemplateId == id).ToList();
                    if (cou != null)
                    {
                        //entities.StyleTempDet.Remove(cou);
                        cou.ForEach(c => entities.StyleTempDet.Remove(c));
                    }
                    entities.SaveChanges();

                    //Mas
                    var cou1 = entities.StyleTempMas.Where(c => c.TemplateId == id).FirstOrDefault();
                    if (cou1 != null)
                    {
                        entities.StyleTempMas.Remove(cou1);
                    }
                    entities.SaveChanges();

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Bank-DeleteData");
                }

            }
            return reserved;
        }
    }
}
