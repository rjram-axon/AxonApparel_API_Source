using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class BulkOrderNomSupRepository : IBulkOrderNomRepository
    {
        OrderEntities entities = new OrderEntities();
        public IQueryable<NominatedSupplier> GetDataList()
        {
            return entities.NominatedSupplier;
        }

        public NominatedSupplier GetDataById(int id)
        {
            throw new NotImplementedException();
        }

        public int AddData(NominatedSupplier objNom)
        {
            var id = entities.NominatedSupplier.Add(objNom);
            entities.SaveChanges();
            return id.NomSupId;
        }

        public bool UpdateData(NominatedSupplier obj)
        {
            throw new NotImplementedException();
        }

        public bool DeleteData(int id)
        {
            throw new NotImplementedException();
        }
    }
}
