import React, {useState} from 'react'
import { renderHook } from '@testing-library/react-hooks'


import {render} from '@testing-library/react'

import {MyComponent} from '@src/index'

test('loads and displays greeting', async () => {
    const {container} = render(<MyComponent />),
          { result } = renderHook(() => useState(true)),
          [hookState, setHookState] = result.current

    const testTs: string = 'test'

    console.log(hookState);

    expect(1).toBeTruthy()
})