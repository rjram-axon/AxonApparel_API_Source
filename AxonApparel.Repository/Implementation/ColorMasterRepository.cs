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
    public class ColorMasterRepository : IColorMasterRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Color> GetDataListAll()
        {
            //return entities.Color.OrderBy(c => c.Color1);
            List<Color> lstemployee = new List<Color>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterColorLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Color employee = new Color();
                    employee.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    employee.Colorname = rdr["Colorname"].ToString();
                    employee.Color1 = rdr["Color"].ToString();
                    employee.Lookup = rdr["Lookup"].ToString();
                    employee.ColorOth = rdr["ColorOth"].ToString();
                    employee.ColorGroupID = Convert.ToInt32(rdr["ColorGroupID"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.ColorCode = rdr["ColorCode"].ToString();
                    employee.Pantone = rdr["Pantone"].ToString();
                    employee.ColorNo = rdr["ColorNo"].ToString();
                 
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Color GetDataById(int id)
        {
            //return entities.Color.Where(c => c.Colorid == id).FirstOrDefault();
            Color employee = new Color();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterColorMasLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.AddWithValue("@colorid", id);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Colorid = Convert.ToInt32(rdr["Colorid"]);
                    employee.Colorname = rdr["Colorname"].ToString();
                    employee.Color1 = rdr["Color"].ToString();
                    employee.Lookup = rdr["Lookup"].ToString();
                    employee.ColorOth = rdr["ColorOth"].ToString();
                    employee.ColorGroupID = Convert.ToInt32(rdr["ColorGroupID"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    employee.ColorCode = rdr["ColorCode"].ToString();
                    employee.Pantone = rdr["Pantone"].ToString();
                    employee.ColorNo = rdr["ColorNo"].ToString();
                }
            }
            return employee;
        }

        public int AddData(Color obj)
        {
            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.Color.Add(obj);
                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Color-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(Color obj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var cou = entities.Color.Where(c => c.Colorid == obj.Colorid).FirstOrDefault();
                    if (cou != null)
                    {
                        cou.IsActive = obj.IsActive;
                        cou.Colorid = obj.Colorid;
                        cou.Color1 = obj.Colorname;
                        cou.ColorGroupID = obj.ColorGroupID;
                        cou.Colorname = obj.Colorname;
                        cou.Lookup = obj.Lookup;
                        cou.ColorCode = obj.ColorCode;
                        cou.Pantone = obj.Pantone;
                        cou.ColorNo = obj.ColorNo;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Color-UpdateData");
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
                    var cou = entities.Color.Where(c => c.Colorid == id).FirstOrDefault();
                    if (cou != null)
                    {
                        entities.Color.Remove(cou);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Color-DeleteData");
                }

            }
            return reserved;
        }

        public IQueryable<Domain.ColorMaster> GetDataColorList()
        {
            try
            {
                var query = (from YD in entities.Proc_Apparel_GetMainColorList()
                             select new Domain.ColorMaster
                             {

                                 ColorId = YD.Colorid,
                                 ColorName = YD.Colorname,
                                 ColorCode = YD.ColorCode,
                                 ColorNo = YD.ColorNo,
                                 IsActive = YD.IsActive ? "TRUE" : "FALSE",

                             }).AsQueryable();

                return query;
            }
            catch (Exception ex) {

                var query = (from YD in entities.Proc_Apparel_GetMainColorList()
                             select new Domain.ColorMaster
                             {

                                 ColorId = YD.Colorid,
                                 ColorName = YD.Colorname,
                                 ColorCode = YD.ColorCode,
                                 ColorNo = YD.ColorNo,
                                 IsActive = YD.IsActive ? "TRUE" : "FALSE",

                             }).AsQueryable();

                return query;
                //return ex.Message;
            
            }
        }


        public List<Domain.ColorMaster> GetRepColorCheckItemDetails(int colorid)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetColorMasterCheck(colorid)
                         select new Domain.ColorMaster
                         {
                             CountColorId = YD1.ChkSizeId,
                             ColorName = YD1.Color,


                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<Color> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
