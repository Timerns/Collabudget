import ListContainer from "@/app/components/listContainer";
import TransactionCategorieType from "@/app/types/transactionCategorieType";
import TransactionCategorie from "./transactionCategorie";

export default function TransactionCategorieList({transactionsCategories, group}: {
  transactionsCategories: TransactionCategorieType[],
  props?: any,
  group?: boolean
}) {

  return (
      <ListContainer doubleRow={false}>
        {
          transactionsCategories.length === 0 ? group ? <p>Aucun label</p> : <p>Aucune dépense</p> :
          transactionsCategories.map((t, i) => {
            return (
              <div key={i} className={`${i < transactionsCategories.length - 1 ? "mb-3" : ""}`}>
                <TransactionCategorie transactionCategorie={t}/>
              </div>
            )
          })
        }
      </ListContainer>
  )
}