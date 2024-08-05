using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AxonApparel.Repository
{
    public class Style1 : IBaseRepository<Style>
    {
        MasterEntities entities = new MasterEntities();

        public IQueryable<Style> GetDataList()
        {
            return entities.Style.OrderBy(c => c.Style1);
        }

        public Style GetDataById(int id)
        {
            return entities.Style.Where(c => c.StyleId == id).FirstOrDefault();
        }

        public int AddData(Style obj)
        {
            var result = entities.Style.Add(obj);
            entities.SaveChanges();
            return result.StyleId;
        }

        public bool UpdateData(Style obj)
        {
            throw new NotImplementedException();
        }

        public bool DeleteData(int id)
        {
            throw new NotImplementedException();
        }
    }
}
