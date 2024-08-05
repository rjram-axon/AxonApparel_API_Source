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
    public class ModeOfShipmentRepository : IModeOfShipmentRepository
    {
        MasterEntities entities = new MasterEntities();
        ExceptionLogging exceplogg = new ExceptionLogging();
        string connStr = ConfigurationManager.ConnectionStrings["myConnectionString"].ConnectionString;
        public IEnumerable<Mode_Of_Shipment> GetModeOfShipments()
        {
           // return entities.Mode_Of_Shipment.OrderBy(c => c.Mode_of_Shipment1);

            List<Mode_Of_Shipment> lstemployee = new List<Mode_Of_Shipment>();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                SqlCommand cmd = new SqlCommand("Proc_Apparel_GetMasterShipmentModeLoad", con);
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    Mode_Of_Shipment employee = new Mode_Of_Shipment();
                    employee.Mode_of_Shipmentid = Convert.ToInt32(rdr["Mode_of_Shipmentid"]);
                    employee.Mode_of_Shipment1 = rdr["Mode_of_Shipment"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                    lstemployee.Add(employee);
                }
                con.Close();
            }
            return lstemployee;
        }

        public Mode_Of_Shipment GetModeOfShipmentById(int modeOfShipmentId)
        {
           // return entities.Mode_Of_Shipment.Where(c => c.Mode_of_Shipmentid == modeOfShipmentId).FirstOrDefault();

            Mode_Of_Shipment employee = new Mode_Of_Shipment();
            using (SqlConnection con = new SqlConnection(connStr))
            {
                string sqlQuery = "select * from Mode_Of_Shipment where Mode_of_Shipmentid= " + modeOfShipmentId;
                SqlCommand cmd = new SqlCommand(sqlQuery, con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();
                while (rdr.Read())
                {
                    employee.Mode_of_Shipmentid = Convert.ToInt32(rdr["Mode_of_Shipmentid"]);
                    employee.Mode_of_Shipment1 = rdr["Mode_of_Shipment"].ToString();
                    employee.IsActive = Convert.ToBoolean(rdr["IsActive"]);
                }
            }
            return employee; 
        }

        public int CreateModeOfShipment(Mode_Of_Shipment modeOfShipment)
        {

            int reserved = 0;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var id = entities.Mode_Of_Shipment.Add(modeOfShipment);

                    entities.SaveChanges();
                    reserved = 1;

                    //The Transaction will be completed
                    txscope.Complete();

                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ModeOfShipment-AddData");
                }

            }
            return reserved;
        }

        public bool UpdateModeOfShipment(Mode_Of_Shipment modeOfShipment)
        {
            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var mos = entities.Mode_Of_Shipment.Where(c => c.Mode_of_Shipmentid == modeOfShipment.Mode_of_Shipmentid).FirstOrDefault();
                    if (mos != null)
                    {
                        mos.IsActive = modeOfShipment.IsActive;
                        mos.Mode_of_Shipment1 = modeOfShipment.Mode_of_Shipment1;
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ModeOfShipment-UpdateData");
                }

            }
            return reserved;
        }

        public bool DeleteModeOfShipment(int modeOfShipmentId)
        {

            bool reserved = false;

            //Define the scope for bundling the transaction
            using (var txscope = new TransactionScope(TransactionScopeOption.RequiresNew))
            {
                try
                {
                    var mos = entities.Mode_Of_Shipment.Where(c => c.Mode_of_Shipmentid == modeOfShipmentId).FirstOrDefault();
                    if (mos != null)
                    {
                        entities.Mode_Of_Shipment.Remove(mos);
                    }
                    entities.SaveChanges();
                    reserved = true;
                    //The Transaction will be completed
                    txscope.Complete();
                }
                catch (Exception ex)
                {
                    txscope.Dispose();
                    exceplogg.SendExcepToDB(ex, "ModeOfShipment-DeleteData");
                }

            }
            return reserved;

        }


        public IList<Domain.ShipmentMode> GetRepShipModeCheckItemDetails(int modeOfShipmentId)
        {
            var query = (from YD1 in entities.Proc_Apparel_GetPayModeMasterCheck(modeOfShipmentId)
                         select new Domain.ShipmentMode
                         {
                             CountShipmentModeId = YD1.ChkPayModeId,
                             ShipementMode = YD1.PayModeSystem,


                         }).AsQueryable();

            return query.ToList();
        }
    }
}
