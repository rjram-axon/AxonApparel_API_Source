using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using System.Web.Mvc;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
namespace AxonApparel.Repository
{
    public class StyleRepository : IStyleRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<StyleHeader> GetDataListAll()
        {
            //return entities.StyleHeader.OrderBy(c => c.Style);

            List<StyleHeader> lstemployee = new List<StyleHeader>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterStyleHeaderLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    StyleHeader employee = new StyleHeader();
                    employee.StyleId = Convert.ToInt32(rdr["StyleId"]);
                    employee.Style = rdr["Style"].ToString();
                    employee.ArticleNo = rdr["ArticleNo"].ToString();
                    employee.Season = rdr["Season"].ToString();
                    employee.DesignName = rdr["DesignName"].ToString();
                    employee.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public StyleHeader GetDataById(int id)
        {
           // return entities.StyleHeader.Where(c => c.StyleId == id).FirstOrDefault();

            StyleHeader employee = new StyleHeader();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from StyleHeader where StyleId= " + id;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.StyleId = Convert.ToInt32(rdr["StyleId"]);
                    employee.Style = rdr["Style"].ToString();
                    employee.ArticleNo = rdr["ArticleNo"].ToString();
                    employee.Season = rdr["Season"].ToString();
                    employee.DesignName = rdr["DesignName"].ToString();
                    employee.Itemid = Convert.ToInt32(rdr["Itemid"]);
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int AddData(StyleHeader obj)
        {

            int reserved = 0;
            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var result = entities.StyleHeader.Add(obj);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Style-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateData(StyleHeader styleobj)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var styleUpd = entities.StyleHeader.Where(c => c.StyleId == styleobj.StyleId).FirstOrDefault();
                    if (styleUpd != null)
                    {
                        styleUpd.IsActive = styleobj.IsActive;
                        styleUpd.Style = styleobj.Style;
                        styleUpd.ArticleNo = styleobj.ArticleNo;
                        styleUpd.Season = styleobj.Season;
                        styleUpd.DesignName = styleobj.DesignName;
                        styleUpd.StyleId = styleobj.StyleId;
                        styleUpd.Itemid = styleobj.Itemid;

                        entities.SaveChanges();
                        reserved = true;
                        //The Transaction will be completed
                        txscope.Complete();
                    }
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Style-UpdateData");
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
                    var styleDel = entities.StyleHeader.Where(c => c.StyleId == id).FirstOrDefault();

                    if (styleDel != null)
                    {
                        entities.StyleHeader.Remove(styleDel);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Style-DeleteData");
                }

            }
            return reserved;
        }

        public bool AddDetData(List<StyleDetail> objCDet, string Mode, int StyleId = 0)
        {
            bool reserved = false;
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    int styleid = 0;
                    //int itemid=0;

                    if (Mode == "Update")
                    {
                        if (objCDet != null && objCDet.Count > 0)
                        {
                            foreach (var item in objCDet)
                            {
                                styleid = item.StyleId;

                            }
                        }
                        else if (StyleId > 0)
                        {
                            styleid = StyleId;
                        }
                        //delete StyleDetail Many Rows table
                        //if(StyleId==0)
                        //{
                        //    styleid = item.StyleId;
                        //}

                        var deletestyledet = entities.StyleDetail.Where(d => d.StyleId == styleid).ToList<StyleDetail>();

                        deletestyledet.ForEach(c => entities.StyleDetail.Remove(c));
                        entities.SaveChanges();
                    }

                    if (objCDet != null && objCDet.Count > 0)
                    {
                        foreach (var item in objCDet)
                        {
                            entities.StyleDetail.Add(item);
                        }
                        entities.SaveChanges();
                    }

                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {

                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "Style-AddDetData");
                }
               
            }
            return reserved;
            
        }


        public IQueryable<Domain.Style> GetDataMainList()
        {
            var query = (from YD in entities.Proc_Apparel_GetMainStyleList()
                         select new Domain.Style
                         {

                             StyleId = YD.StyleId,
                             StyleName = YD.Style,
                             ArticleNo = YD.ArticleNo,
                             IsActive = YD.IsActive ? "TRUE" : "FALSE",

                         }).AsQueryable();

            return query;
        }


        public IList<Domain.Style> GetRepStyleCheckItemDetails(int StyleId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetStyleMasterCheck(StyleId)
                         select new Domain.Style
                         {
                             CountStyleId = YD1.ChkStyleId,
                             StyleName = YD1.Style,

                         }).AsQueryable();

            return query.ToList();
        }

        public IQueryable<StyleHeader> GetDataList()
        {
            throw new NotImplementedException();
        }
    }
}
