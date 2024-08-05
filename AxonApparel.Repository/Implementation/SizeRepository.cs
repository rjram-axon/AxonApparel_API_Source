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
    public class SizeRepository : ISizeRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Domain.Size> GetDataListAll()
        {
            //return entities.Size.OrderBy(c => c.size1);
            List<Domain.Size> lstemployee = new List<Domain.Size>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSizeLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Size employee = new Domain.Size();
                    employee.SizeId = Convert.ToInt32(rdr["SizeId"]);
                    employee.SizeName = rdr["size"].ToString();
                    employee.ItemType = rdr["Item_Type"].ToString();
                    employee.Lookup = rdr["lookup"].ToString();
                    employee.ActualSize = Convert.ToInt32(rdr["ActualSize"]);
                    employee.Seqno = Convert.ToInt32(rdr["SeqNo"]);
                    employee.IsActive = rdr["IsActive"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }
        public IEnumerable<Domain.Size> GetGDataList()
        {
            //return entities.Size.Where(c => c.Item_Type == "Garment").OrderBy(c => c.size1);
            List<Domain.Size> lstemployee = new List<Domain.Size>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSizeGarmentLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Size employee = new Domain.Size();
                    employee.SizeId = Convert.ToInt32(rdr["SizeId"]);
                    employee.SizeName = rdr["size"].ToString();
                    employee.ItemType = rdr["Item_Type"].ToString();
                    employee.Lookup = rdr["lookup"].ToString();
                    employee.ActualSize = Convert.ToInt32(rdr["ActualSize"]);
                    employee.Seqno = Convert.ToInt32(rdr["SeqNo"]);
                    employee.IsActive = rdr["IsActive"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Domain.Size> GetFDataList()
        {
            //return entities.Size.Where(c => c.Item_Type == "Fabric").OrderBy(c => c.size1);
            List<Domain.Size> lstemployee = new List<Domain.Size>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSizeFabricLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Size employee = new Domain.Size();
                    employee.SizeId = Convert.ToInt32(rdr["SizeId"]);
                    employee.SizeName = rdr["size"].ToString();
                    employee.ItemType = rdr["Item_Type"].ToString();
                    employee.Lookup = rdr["lookup"].ToString();
                    employee.ActualSize = Convert.ToInt32(rdr["ActualSize"]);
                    employee.Seqno = Convert.ToInt32(rdr["SeqNo"]);
                    employee.IsActive = rdr["IsActive"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public IEnumerable<Domain.Size> GetYDataList()
        {
            //return entities.Size.Where(c => c.Item_Type == "Yarn").OrderBy(c => c.size1);
            List<Domain.Size> lstemployee = new List<Domain.Size>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterSizeYarnLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Domain.Size employee = new Domain.Size();
                    employee.SizeId = Convert.ToInt32(rdr["SizeId"]);
                    employee.SizeName = rdr["size"].ToString();
                    employee.ItemType = rdr["Item_Type"].ToString();
                    employee.Lookup = rdr["lookup"].ToString();
                    employee.ActualSize = Convert.ToInt32(rdr["ActualSize"]);
                    employee.Seqno = Convert.ToInt32(rdr["SeqNo"]);
                    employee.IsActive = rdr["IsActive"].ToString();

                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }


        public Size GetDataById(int id)
        {
            //return entities.Size.Where(c => c.SizeId == id).FirstOrDefault();
            Size employee = new Size();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Size where SizeId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.SizeId = Convert.ToInt32(rdr["SizeId"]);
                    employee.size1 = rdr["size"].ToString();
                    employee.Item_Type = rdr["Item_Type"].ToString();
                    employee.lookup = rdr["lookup"].ToString();
                    employee.ActualSize = Convert.ToDecimal(rdr["ActualSize"]);
                    employee.SeqNo = Convert.ToInt32(rdr["SeqNo"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee;
        }

        public int AddData(Size obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Size.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Size-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Size obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Size.Where(c => c.SizeId == obj.SizeId).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.size1 = obj.size1;
                        cou.SizeId = obj.SizeId;
                        cou.lookup = obj.lookup;
                        cou.Item_Type = obj.Item_Type;
                        cou.SeqNo = obj.SeqNo;
                        cou.ActualSize = obj.ActualSize;

                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Size-UpdateData");
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
                    var cou = entities.Size.Where(c => c.SizeId == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Size.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Size-DeleteData");
                }

            }
            return reserved;
        }


        public IList<Domain.Size> GetRepSizeCheckItemDetails(int SizeId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetSizeMasterCheck(SizeId)
                         select new Domain.Size
                         {
                             CountSizeId = YD1.ChkSizeId,
                             SizeName = YD1.Size,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Size> GetDataList()
        {
            throw new NotImplementedException();
        }


        public bool UpdateSizSeqDetData(List<Size> objAdDet)
        {
            bool reserved = false;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew, System.TimeSpan.MaxValue))
            {
                try
                {

                    foreach (var j in objAdDet)
                    {
                        var d = entities.Size.Where(a => a.SizeId.Equals(j.SizeId)).FirstOrDefault();
                        if (d != null)
                        {
                            d.SeqNo = j.SeqNo;

                        }
                    }
                    
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                }

            }
            return reserved;
        }


        public IList<Domain.Size> GetSizeRepSeqDetList()
        {
            var query = (from Ec in entities.Proc_Apparel_GetSizeEditSeqList()
                         select new Domain.Size
                         {
                             SizeId = Ec.sizeid,
                             SizeName = Ec.size,
                             Seqno = Ec.Seqno,                        

                         }).AsQueryable();

            return query.ToList();
        }
    }
}
