using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AxonApparel.Repository;
using System.Transactions;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class GarmentUomRepository : IGarmentUomRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Garment_Uom> GetDataListAll()
        {
            //return entities.Garment_Uom.OrderBy(c => c.GUom);
            List<Garment_Uom> lstemployee = new List<Garment_Uom>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterGarmentUomLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Garment_Uom employee = new Garment_Uom();
                    employee.GUomId = Convert.ToInt32(rdr["GUomId"]);
                    employee.GUom = rdr["GUom"].ToString();
                    employee.GUom_Lookup = rdr["GUom_Lookup"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.To_BUom = Convert.ToByte(rdr["To_BUom"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Garment_Uom> GetDataListBase()
        {
            //return entities.Garment_Uom.Where(c => c.GUom_Lookup == "PCS").OrderBy(c => c.GUom);
            List<Garment_Uom> lstemployee = new List<Garment_Uom>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterGarmentUomPcsLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Garment_Uom employee = new Garment_Uom();
                    employee.GUomId = Convert.ToInt32(rdr["GUomId"]);
                    employee.GUom = rdr["GUom"].ToString();
                    employee.GUom_Lookup = rdr["GUom_Lookup"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.To_BUom = Convert.ToByte(rdr["To_BUom"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Garment_Uom GetDataById(int GUomId)
        {
            return entities.Garment_Uom.Where(c => c.GUomId == GUomId).FirstOrDefault();
        }

        public int AddData(Garment_Uom Obj)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Garment_Uom.Add(Obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GarmentUom-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Garment_Uom Garment_Uomobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Garment_UomUpd = entities.Garment_Uom.Where(c => c.GUomId == Garment_Uomobj.GUomId).FirstOrDefault();
                    if (Garment_UomUpd != null)
                    {
                        Garment_UomUpd.GUomId = Garment_Uomobj.GUomId;
                        Garment_UomUpd.GUom = Garment_Uomobj.GUom;
                        Garment_UomUpd.GUom_Lookup = Garment_Uomobj.GUom_Lookup;
                        Garment_UomUpd.To_BUom = Garment_Uomobj.To_BUom;
                        Garment_UomUpd.IsActive = Garment_Uomobj.IsActive;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GarmentUom-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteData(int GUomId)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var Garment_UomDel = entities.Garment_Uom.Where(c => c.GUomId == GUomId).FirstOrDefault();
                    if (Garment_UomDel != null)
                    {
                        entities.Garment_Uom.Remove(Garment_UomDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "GarmentUom-DeleteData");
                }

            }
            return reserved;
        }


        public IList<Domain.Garment_Uom> GetRepGuomCheckItemDetails(int Guomid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetGarmUomMasterCheck(Guomid)
                         select new Domain.Garment_Uom
                         {
                             CountGuomId = YD1.ChkGuomId,
                             GUom = YD1.Guom,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Garment_Uom> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
