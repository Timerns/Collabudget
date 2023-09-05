import ListContainer from "@/app/components/listContainer";
import TransactionCategorieType from "@/app/types/transactionCategorieType";
import TransactionCategorie from "./transactionCategorie";

export default function TransactionCategorieList({transactionsCategories}: {
  transactionsCategories: TransactionCategorieType[],
  props?: any
}) {

  return (
      <ListContainer doubleRow={false}>
        {
          transactionsCategories.length === 0 ? <p>Aucune dépense</p> :
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