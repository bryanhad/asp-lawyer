import { Button } from '../ui/button'
import { Search as SearchIcon } from 'lucide-react'
import Modal from '../ui/modal'

export default function Search() {
    return (
        <Modal
            buttonCustom={
                <Button variant="outline">
                    <SearchIcon />
                </Button>
            }
            title='aaa'
        >
            Seachinnn
        </Modal>
    )
}
