using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using System.ComponentModel.DataAnnotations;
using System.Xml.Serialization;
using System.Collections;
using System.Data.SqlClient;
using System.Data.Entity;
using System.Transactions;
using System.Data;
using System.Configuration;
namespace AxonApparel.Repository
{
    public class ItemRepository : IItemRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;

        public IEnumerable<Domain.Item> GetItemlistOthersAll()
        {
            //return entities.Item.OrderBy(c => c.Item1);
            //return entities.Item.Where(c => (c.ItemType == "OTHERS"));

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAllItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;

        }

        public IQueryable<Domain.Item> GetItemlist()
        {
            var query = (from YD in entities.Proc_Apparel_GetMainItemList()
                         select new Domain.Item
                         {

                             Itemid = YD.ItemId,
                             ItemName = YD.Item,
                             IsActive = YD.IsActive ? "TRUE" : "FALSE",

                         }).AsQueryable();

            return query;
        }

        public IEnumerable<Shift> GetshiftList()
        {
            //return entities.Shift.OrderBy(c => c.shiftid);

            List<Shift> lstemployee = new List<Shift>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterShiftLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Shift employee = new Shift();

                    employee.shiftid = Convert.ToInt32(rdr["shiftid"]);
                    employee.Shift1 = rdr["Shift"].ToString();
                    employee.RegularOrOT = rdr["RegularOrOT"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Item GetDataById(int id)
        {
            //return entities.Item.Where(c => c.ItemId == id).FirstOrDefault();

            Item employee = new Item();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Item where ItemId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.ItemId = Convert.ToInt32(rdr["ItemId"]);
                    employee.Item1 = rdr["Item"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);               
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.Bas_Unit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.Sec_Unit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.Pur_Unit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemType = rdr["ItemType"].ToString();
                    employee.Descript = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.Item_Cat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.ColorOth = rdr["ColorOth"].ToString();
                    employee.conv_factor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.Percentage = rdr["Percentage"].ToString();
                    employee.Allow_Value = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.ColorNo = rdr["ColorNo"].ToString();
                    employee.GSTTaxCode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTTaxCode = rdr["IGSTTaxCode"].ToString();
                    employee.MajComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.Itemrate = Convert.ToDecimal(rdr["itemrate"]);
                    
                }
            }
            return employee;

        }
        //public IQueryable<ProcessSequenceMain> GetFItemid()
        //{

        //}
        public int AddData(Item obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Item.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Item-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Item itemobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var itemUpd = entities.Item.Where(c => c.ItemId == itemobj.ItemId).FirstOrDefault();
                    if (itemUpd != null)
                    {
                        itemUpd.IsActive = itemobj.IsActive;
                        itemUpd.MajComp = itemobj.MajComp;
                        itemUpd.ItemId = itemobj.ItemId;
                        itemUpd.ItemGroupId = itemobj.ItemGroupId;
                        itemUpd.Item1 = itemobj.Item1;
                        itemUpd.Descript = itemobj.Descript;
                        itemUpd.ItemType = itemobj.ItemType;
                        itemUpd.Bas_Unit = itemobj.Bas_Unit;
                        itemUpd.Sec_Unit = itemobj.Sec_Unit;
                        itemUpd.Pur_Unit = itemobj.Pur_Unit;
                        itemUpd.IGST = itemobj.IGST;
                        itemUpd.SGST = itemobj.SGST;
                        itemUpd.CGST = itemobj.CGST;
                        itemUpd.HSNCODE = itemobj.HSNCODE;
                        itemUpd.Item_Cat = itemobj.Item_Cat;
                        itemUpd.conv_factor = itemobj.conv_factor;
                        itemUpd.lookup = itemobj.lookup;
                        itemUpd.ColorOth = itemobj.ColorOth;
                        itemUpd.ColorNo = itemobj.ColorNo;
                        itemUpd.Percentage = itemobj.Percentage;
                        itemUpd.Allow_Value = itemobj.Allow_Value;
                        itemUpd.Itemrate = itemobj.Itemrate;
                        itemUpd.GSTTaxCode = itemobj.GSTTaxCode;
                        itemUpd.IGSTTaxCode = itemobj.IGSTTaxCode;
                        itemUpd.MinQty = itemobj.MinQty;
                        itemUpd.MaxQty = itemobj.MaxQty;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Item-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int id)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var ItemDel = entities.Item.Where(c => c.ItemId == id).FirstOrDefault();
                    if (ItemDel != null)
                    {
                        entities.Item.Remove(ItemDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Item-DeleteData");
                }

            }
            return reserved;
        }

        public string GetFItemid(string[] FIG)
        // internal static ArrayList GetLocations(string[] FIG)
        {

            MasterEntities dbMovie = new MasterEntities();

            string itemgid = "";

            //string strNumSeq = "";

            foreach (string value in FIG)
            {

                itemgid = value;

            }


            //var result1 = this.entities.Database.SqlQuery<IList<string>>("exec Proc_Apparel_ItemGroupCheck {0}", itemgid).ToList();

            //string storedProcedure = "Proc_Apparel_ItemGroupCheck @ItemGroupId=" + itemgid;

            //var s = entities.Database.ExecuteStoreQuery<List<string>>("exec " + storedProcedure).ToList();

            var result = entities.Database.SqlQuery<string>("EXEC Proc_Apparel_ItemGroupCheck {0}", itemgid).ToList();
            //string json = "";
            //  return json = JsonConvert.SerializeObject(obj);

            //if (result != null)
            //{

            //    strNumSeq = result;
            //}
            return itemgid;


            //var query = (from Ec in entities.Proc_Apparel_ItemGroupCheck(itemgid)
            //             select new Item
            //             {
            //                 CompSlNo = Ec.CompSlNo,
            //                 PlanID = Ec.PlanID,
            //                 ComponentID = Ec.CompId,
            //                 ComponentName = Ec.Component,
            //                 No_Of_Parts = Ec.No_Of_Parts,
            //                 Fabric_TypeID = Ec.Fabric_Type,
            //                 Fabric_Type = Ec.Fabric_Type,
            //                 GroupingID = Ec.GroupType,
            //                 Grouping = Ec.GroupType,
            //                 Unit = Ec.Unit,
            //                 Description = Ec.Descrp,
            //                 FabricID = Ec.FabricId,
            //                 FabricName = Ec.Fabric,
            //                 Comp_Plan_MasID = Ec.Comp_Plan_MasID,
            //                 Entry_Date = Ec.Entry_Date,
            //             }).AsQueryable();

            //return query.ToList();
            //var listResult = (from d in entities.Proc_Apparel_ItemGroupCheck(itemgid)
            //                  select d).ToList();

        }

        public IEnumerable<Domain.Item> GetAccessoryDataList()
        {
            //return entities.Item.Where(c => c.ItemType == "ACCESSORY" || c.ItemType == "PACKING").OrderBy(c => c.Item1);

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAccItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Domain.Item> GetComponentDataList()
        {
            //return entities.Item.Where(c => c.ItemType == "COMPONENT").OrderBy(c => c.Item1);

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterComponentItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate=Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.Item> GetFabricDataList()
        {
            //return entities.Item.Where(c => c.ItemType == "FABRIC").OrderBy(c => c.Item1);

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterFabricItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.Item> GetYarnDataList()
        {
            //return entities.Item.Where(c => c.ItemType == "YARN").OrderBy(c => c.Item1);

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterYarnItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IEnumerable<Domain.Item> GetGarmentDataList()
        {
            //return entities.Item.Where(c => c.ItemType == "GARMENT").OrderBy(c => c.Item1);

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterGarmentItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IEnumerable<Domain.Item> GetDropItemDataList()
        {
            //return entities.Item.OrderBy(c => c.Item1);
            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAllItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public IList<Domain.Item> GetRepItemCheckItemDetails(int Itemid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetItemMasterCheck(Itemid)
                         select new Domain.Item
                         {
                             CountItemId = YD1.ChkItemId,
                             ItemName = YD1.Item,


                         }).AsQueryable();

            return query.ToList();
        }


        public IEnumerable<Domain.Item> GetHsnList()
        {
            //return entities.Acc_HSNMaster.OrderBy(c => c.HSNcode);

            //IQueryable<Domain.Item> query = (from T in entities.Acc_HSNMaster
            
            // select new Domain.Item
            // {
            //     HSNCODE=T.HSNcode,
            //     HSNCODEDesc = (T.HSNcode +" - "+ T.HSNdesc).Trim(),


            // }).AsQueryable();

            //return query;

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterAccHsnItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();
                    
                    employee.HSNCODE = rdr["HSNcode"].ToString();
                    employee.HSNCODEDesc = rdr["HSNCODEDesc"].ToString();
      
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IList<Domain.Item> GetRepGstDetails(string Hsncode)
        {
            var query = (from Gst in entities.Proc_Apparel_GetCSIGSTDetails(Hsncode)
                         select new Domain.Item
                         {
                             CGST = Gst.CGSTper,
                             SGST = Gst.SGSTper,
                             IGST = Gst.IGSTPer,
                             GSTtaxcode = Gst.GSTtaxcode,
                             IGSTtaxcode = Gst.IGSTtaxcode,

                         }).AsQueryable();

            return query.ToList();
        }


        public IEnumerable<Domain.Item> GetGeneralItemDataList()
        {
           // return entities.Item.Where(c => c.ItemType == "OTHERS").OrderBy(c => c.Item1);
            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterOtherItemLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();
                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();
                    employee.IsActive = rdr["IsActive"].ToString();
                    employee.ItemGroupId = Convert.ToInt32(rdr["ItemGroupId"]);
                    employee.ItemGroupName = rdr["ItemGroup"].ToString();
                    employee.BasicUnit = Convert.ToInt32(rdr["Bas_Unit"]);
                    employee.SecUnit = Convert.ToInt32(rdr["Sec_Unit"]);
                    employee.PurUnit = Convert.ToInt32(rdr["Pur_Unit"]);
                    employee.ItemTypeName = rdr["ItemType"].ToString();
                    employee.Description = rdr["Descript"].ToString();
                    employee.CGST = Convert.ToDecimal(rdr["CGST"]);
                    employee.SGST = Convert.ToDecimal(rdr["SGST"]);
                    employee.IGST = Convert.ToDecimal(rdr["IGST"]);
                    employee.HSNCODE = rdr["HSNCODE"].ToString();
                    employee.itemcat = rdr["Item_Cat"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.color0th = rdr["ColorOth"].ToString();
                    employee.convfactor = Convert.ToDecimal(rdr["conv_factor"]);
                    employee.percentage = rdr["Percentage"].ToString();
                    employee.allowvalue = Convert.ToDecimal(rdr["Allow_Value"]);
                    employee.colornum = rdr["ColorNo"].ToString();
                    employee.GSTtaxcode = rdr["GSTTaxCode"].ToString();
                    employee.IGSTtaxcode = rdr["IGSTTaxCode"].ToString();
                    employee.MajorComp = rdr["MajComp"].ToString();
                    employee.MinQty = Convert.ToDecimal(rdr["MinQty"]);
                    employee.MaxQty = Convert.ToDecimal(rdr["MaxQty"]);
                    employee.rate = Convert.ToDecimal(rdr["itemrate"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.Item> GetItembygrpid(string Itemgrpid)
        {
            //return entities.Acc_HSNMaster.OrderBy(c => c.HSNcode);

            //IQueryable<Domain.Item> query = (from T in entities.Item.Where(c => c.ItemType == Itemgrpid)

            //                                 select new Domain.Item
            //                                 {
            //                                     Itemid = T.ItemId,
            //                                     ItemName =T.Item1 ,
            //                                 }).AsQueryable();

            //return query;

            List<Domain.Item> lstemployee = new List<Domain.Item>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterItemGroupMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@ItemType", Itemgrpid);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Item employee = new Domain.Item();

                    employee.Itemid = Convert.ToInt32(rdr["ItemId"]);
                    employee.ItemName = rdr["Item"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
              

        public IQueryable<Item> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
